// Repositories talk to models
// common create, read, update, delete functionalities for all models

const { Logger } = require('../config')

class CrudRepository {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    try {
      const response = await this.model.create(data)
      return response
    } catch (error) {
      Logger.error('Something went wrong in Crud repo : Create fn')
      throw error
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data
        }
      })
      return response
    } catch (error) {
      Logger.error('Something went wrong in Crud repo : Destroy fn')
      throw error
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data)
      return response
    } catch (error) {
      Logger.error('Something went wrong in Crud repo : Get fn')
      throw error
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll()
      return response
    } catch (error) {
      Logger.error('Something went wrong in Crud repo : getAll fn')
      throw error
    }
  }

  async update(id, data) {
    // data -> {col: value, ...}
    try {
      const response = await this.model.update(data, {
        where: {
          id: id
        }
      })
      return response
    } catch (error) {
      Logger.error('Something went wrong in Crud repo : update fn')
      throw error
    }
  }
}

module.exports = CrudRepository
