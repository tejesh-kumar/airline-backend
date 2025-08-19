const { StatusCodes } = require('http-status-codes')
const { CityRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository()

async function createCity(data) {
  try {
    const city = await cityRepository.create(data)
    return city
  } catch (error) {
    if (
      ['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(
        error.name
      )
    ) {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    throw new AppError(
      'Cannot create a new city obj',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll()
    return cities
  } catch (error) {
    console.log(error)
    throw new AppError(
      'Cannot fetch data of all cities',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id)
    return city
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
        'Cannot find the city that you requested',
        error.statusCode
      )
    }
    throw new AppError('Cannot get the city', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function deleteCity(id) {
  try {
    const res = await cityRepository.destroy(id)
    return res
  } catch (error) {
    if (error.statusCode === 404) {
      throw new AppError(
        'Cannot find the city to delete that you requested',
        error.statusCode
      )
    }
    throw new AppError('Cannot get the city', StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data)
    return city
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      let explanation = []
      error.errors.forEach((err) => {
        explanation.push(err.message)
      })
      throw new AppError(explanation, StatusCodes.BAD_REQUEST)
    }
    throw new AppError(
      'Could not update the city data',
      StatusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  deleteCity,
  updateCity
}
