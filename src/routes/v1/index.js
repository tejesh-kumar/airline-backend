const express = require('express')

const { InfoController } = require('../../controllers')

const airPlaneRoutes = require('./airplane-routes')
const airportRoutes = require('./airport-routes')
const cityRoutes = require('./city-routes')

const router = express.Router()

router.use('/airplanes', airPlaneRoutes)

router.use('/airports', airportRoutes)

router.use('/cities', cityRoutes)

router.get('/info', InfoController.info)

module.exports = router
