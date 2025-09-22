const { StatusCodes } = require('http-status-codes')
const { Op } = require('sequelize')

const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const { compareTime } = require('../utils/helpers/datetime-helpers')
const { getUTCDateString } = require('../utils/helpers/convertToUtcDateString')

const flightRepository = new FlightRepository()

const getFilterObj = (filter) => {
  // const filterObj = {
  //   [Op.and]: [{ departureAirportId: 'BLR' }, { price: { [Op.gt]: 4000 } }]
  // }
  const filterObj = {}
  let sortFilter = []
  const { trips, price, travellers, tripDate, sort } = filter

  if (price) {
    const [minPrice, maxPrice] = price.split('-')
    filterObj.price = {
      [Op.and]: [{ [Op.gte]: minPrice }, { [Op.lte]: maxPrice || 20000 }]
    }
  }
  if (trips) {
    const [departureAirportId, arrivalAirportId] = trips.split('-')
    if (departureAirportId === arrivalAirportId)
      throw new Error('sameDepartureArrivalAirportCodeError')
    filterObj.departureAirportId = departureAirportId
    filterObj.arrivalAirportId = arrivalAirportId
  }
  if (travellers) {
    filterObj.totalSeats = {
      [Op.gte]: travellers
    }
  }
  if (tripDate) {
    const utcStartDate = getUTCDateString(tripDate)
    const utcEndDate = getUTCDateString(`${tripDate} 23:59:00`)
    filterObj.departureTime = {
      [Op.between]: [utcStartDate, utcEndDate]
    }
  }
  if (sort) {
    const params = sort.split(',')
    sortFilter = params.map((param) => param.split('_'))
  }

  return { filterObj, sortFilter }
}

async function createFlight(data) {
  try {
    const isDepartureBeforeArrival = compareTime(
      data?.arrivalTime,
      data?.departureTime
    )
    if (!isDepartureBeforeArrival) {
      throw new Error('departureBeforeArrivalError')
    }
    const flight = await flightRepository.create(data)
    return flight
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.message === 'departureBeforeArrivalError') {
      let explanation = 'Departure time cannot be earlier than arrival time'
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    throw new AppError(
      'Cannot create a new flight obj',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function getAllFlights(filter) {
  try {
    // const filterObj = {
    //   [Op.and]: [{ departureAirportId: 'BLR' }, { price: { [Op.gt]: 4000 } }]
    // }
    const { filterObj, sortFilter } = getFilterObj(filter)
    const flights = await flightRepository.getAllFlights(filterObj, sortFilter)
    return flights
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.message === 'departureBeforeArrivalError') {
      let explanation = 'Departure time cannot be earlier than arrival time'
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.message === 'sameDepartureArrivalAirportCodeError') {
      let explanation =
        'Departure airport id cannot be same as arrival airport id'
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    console.log(error)
    throw new AppError(
      'Cannot fetch data of all the flights',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

module.exports = {
  createFlight,
  getAllFlights
}
