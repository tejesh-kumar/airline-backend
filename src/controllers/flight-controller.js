const { StatusCodes } = require('http-status-codes')

const { FlightService } = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

// POST: /flights
// req-body {
//   flightNumber: 'UK 808',
//   airplaneId: 'a380',
//   departureAirportId: 12,
//   arrivalAirportId: 11,
//   departureTime: 11:10:00,
//   arrivalTime: 09:10:00,
//   price: 2000,
//   boardingGate: '12A',
//   totalSeats: 120
// }

async function createFlight(req, res) {
  try {
    const response = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats
    })
    SuccessResponse.data = response
    return res.status(StatusCodes.CREATED).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.error = error
    return res.status(error.statusCode).json(ErrorResponse)
  }
}

module.exports = { createFlight }
