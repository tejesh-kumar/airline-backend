const { StatusCodes } = require('http-status-codes')

const { AirplaneService } = require('../services')

// POST: /Airplanes
// req-body {modelNumber: 'airbus320', capacity: 200}

async function createAirplane(req, res) {
  try {
    const response = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity
    })
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Sucessfully created a airplane',
      data: response,
      error: {}
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong while creating a airplane',
      data: {},
      error: error
    })
  }
}

module.exports = { createAirplane }
