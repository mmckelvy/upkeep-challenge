const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

// Route middleware
const { authenticateRequest } = require('./utils')

// Route handlers
const login = require('./login')
const logout = require('./logout')
const getWorkOrders = require('./get-work-orders')
const createWorkOrder = require('./create-work-order')

// Parse POST bodies
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

// Public routes
router.post('/login', login)
router.delete('/logout', logout)

// Authenticated routes
router.use(authenticateRequest)

// All routes will be prefixed with '/api'
router.get('/get-work-orders', getWorkOrders)
router.post('/create-work-order', createWorkOrder)

module.exports = router
