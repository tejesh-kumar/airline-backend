const { StatusCodes } = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = 'Something went wrong while creating an airport'
    ErrorResponse.error = new AppError(
      ['name is not found in the incoming request in correct format'],
      StatusCodes.BAD_REQUEST
    )

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  if (!req.body.code) {
    ErrorResponse.message = 'Something went wrong while creating an airport'
    ErrorResponse.error = new AppError(
      ['code is not found in the incoming request in correct format'],
      StatusCodes.BAD_REQUEST
    )

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  if (!req.body.cityId) {
    ErrorResponse.message = 'Something went wrong while creating an airport'
    ErrorResponse.error = new AppError(
      ['cityId is not found in the incoming request in correct format'],
      StatusCodes.BAD_REQUEST
    )

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
  }
  next()
}

module.exports = { validateCreateRequest }
