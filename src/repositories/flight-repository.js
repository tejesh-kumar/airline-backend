const CrudRepository = require('./crud-repository')
const { Flight } = require('../models')

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight)
  }

  async getAllFlights(filter, sortFilter) {
    const response = await Flight.findAll({
      where: filter,
      order: sortFilter
    })
    return response
  }
}

module.exports = FlightRepository
