// Core modules
const http = require('http')
const path = require('path')

// 3rd party libs
const express = require('express')
const Boom = require('boom')

// Local requires
const serveCompressed = require('./utils/serve-compressed')
const api = require('./api')

// Create the express app
const app = express()

// Disable for security reasons
app.disable('x-powered-by')

// Static file handling
app.use(serveCompressed())
app.use('/assets', express.static(path.join(__dirname, './assets')))

// API routes
app.use('/api', api)

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

// Main error handler
app.use((err, req, res, next) => {
  // All Boom errors should be non 5xx (e.g. 400, 401, etc.)
  if (err.isBoom && err.output.statusCode[0] !== 5) {
    const { output } = err

    // Send back the error status and message
    return res.status(output.statusCode).json(output.payload)
  }

  // We have a programmer / system error (500)
  // Log the error (in production this should send some kind of alert)
  console.log(err)

  // Send back a 500
  res.status(500).json(Boom.internal().output.payload)
})


// Start the server
http.createServer(app).listen(3000, () => {
  console.log('Server listening on port 3000')
})
