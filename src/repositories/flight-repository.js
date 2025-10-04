const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport, City } = require('../models')
const { Sequelize } = require('sequelize')

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight)
  }

  async getAllFlights(filter, sortFilter) {
    const response = await Flight.findAll({
      where: filter,
      order: sortFilter,
      include: [
        {
          model: Airplane,
          required: true,
          as: 'airplaneDetail'
        },
        {
          model: Airport,
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.departureAirportId'),
              '=',
              Sequelize.col('departureAirport.code')
            )
          },
          as: 'departureAirport',
          include: [
            {
              model: City,
              required: true
            }
          ]
        },
        {
          model: Airport,
          required: true,
          on: {
            col1: Sequelize.where(
              Sequelize.col('Flight.arrivalAirportId'),
              '=',
              Sequelize.col('arrivalAirport.code')
            )
          },
          as: 'arrivalAirport',
          include: [
            {
              model: City,
              required: true
            }
          ]
        }
      ]
    })
    return response
  }
}

module.exports = FlightRepository
