const Boom = require('boom')
const { requestAsync: request } = require('./utils')

module.exports = async function createWorkOrder(req, res, next) {
  try {
    const [ scheme, token ] = req.header('authorization').split(' ')

    /*
    Potentially do some basic validation
    */

    const { response, body } = await request({
      method: 'POST',
      url: 'https://api.onupkeep.com/api/v2/work-orders',
      json: req.body,
      headers: {
        'Session-Token': token,
      }
    })

    // Assume any non 200 response is this server's fault.
    if (response.statusCode !== 200) {
      throw Boom.internal()
    }

    res.status(200).json(body)

  } catch (err) {
    // Pass the error to the main error handler
    next(err)
  }
}
