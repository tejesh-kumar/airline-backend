const express = require('express')

const { InfoController } = require('../../controllers')

const airPlaneRoutes = require('./airplane-routes')

const router = express.Router()

router.use('/airplanes', airPlaneRoutes)

router.get('/info', InfoController.info)

module.exports = router
