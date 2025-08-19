const express = require('express')

const { InfoController } = require('../../controllers')

const airPlaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-routes')

const router = express.Router()

router.use('/airplanes', airPlaneRoutes)

router.use('/cities', cityRoutes)

router.get('/info', InfoController.info)

module.exports = router
