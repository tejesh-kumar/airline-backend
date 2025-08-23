const { StatusCodes } = require('http-status-codes')

const { CityService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

// POST: /cities
// req-body {name: 'London'}

async function createCity(req, res) {
  try {
    const response = await CityService.createCity({
      name: req.body.name
    })
    SuccessResponse.data = response
    return res.status(StatusCodes.CREATED).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error
    return res.status(error.statusCode).json(ErrorResponse)
  }
}

async function deleteCity(req, res) {
  try {
    const response = await CityService.deleteCity(req.params.id)
    SuccessResponse.data = response
    return res.status(StatusCodes.OK).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error
    return res.status(error.statusCode).json(ErrorResponse)
  }
}

module.exports = { createCity, deleteCity }
