const { StatusCodes } = require('http-status-codes')
const { AirportRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const airportRepository = new AirportRepository()

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data)
    return airport
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.name === 'SequelizeDatabaseError') {
      const explanation = error.parent?.sqlMessage || error.message
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    throw new AppError(
      'Cannot create a new airport obj',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll()
    return airports
  } catch (error) {
    console.log(error)
    throw new AppError(
      'Cannot fetch data of all airports',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id)
    return airport
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.statusCode === 404) {
      throw new AppError(
        'Cannot find the airport that you requested',
        error.statusCode
      )
    }
    throw new AppError(
      'Cannot get the airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function deleteAirport(id) {
  try {
    const res = await airportRepository.destroy(id)
    return res
  } catch (error) {
    if (error.statusCode === 404) {
      throw new AppError(
        'Cannot find the airport to delete that you requested',
        error.statusCode
      )
    }
    throw new AppError(
      'Cannot get the airport',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data)
    return airport
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    if (error.name === 'SequelizeDatabaseError') {
      const explanation = error.parent?.sqlMessage || error.message
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    throw new AppError(
      'Could not update the airport data',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
  updateAirport
}
