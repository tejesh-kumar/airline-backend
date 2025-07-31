// Repositories talk to models
// common create, read, update, delete functionalities for all models

const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/errors/app-error')

// const { Logger } = require('../config')

class CrudRepository {
  constructor(model) {
    this.model = model
  }

  async create(data) {
    const response = await this.model.create(data)
    return response
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data
      }
    })
    if (!response) {
      throw new AppError(
        'Not able to find the resource to delete',
        StatusCodes.NOT_FOUND
      )
    }
    return response
  }

  async get(data) {
    const response = await this.model.findByPk(data)
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
    }
    return response
  }

  async getAll() {
    const response = await this.model.findAll()
    return response
  }

  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id
      }
    })
    if (!response) {
      throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
    }
    const updatedUser = await this.get(id)
    return updatedUser
  }
}

module.exports = CrudRepository
