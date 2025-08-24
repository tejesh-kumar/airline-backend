const { StatusCodes } = require('http-status-codes')
const { FlightRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const { compareTime } = require('../utils/helpers/datetime-helpers')

const flightRepository = new FlightRepository()

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

module.exports = {
  createFlight
}
