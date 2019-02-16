const Boom = require('boom')
const { requestAsync: request } = require('./utils')

module.exports = async function createWorkOrder(req, res, next) {
  try {
    const [ scheme, token ] = req.header('authorization').split(' ')

    const { response, body } = await request({
      method: 'POST',
      url: 'https://api.onupkeep.com/api/v2/work-orders',
      json: req.body,
      headers: {
        'Session-Token': token,
      }
    })

    res.status(200).json({workOrder: body.result})

  } catch (err) {
    // Pass the error to the main error handler
    next(err)
  }
}
