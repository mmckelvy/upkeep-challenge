const { requestAsync: request } = require('./utils')

module.exports = async function getWorkOrders(req, res, next) {
  try {
    const [ scheme, token ] = req.header('authorization').split(' ')

    const { response, body } = await request({
      method: 'GET',
      url: `https://api.onupkeep.com/api/v2/work-orders`,
      json: true,
      headers: {
        'Session-Token': token
      }
    })

    res.status(200).json(body)

  } catch (err) {
    // Pass the error to the main error handler
    next(err)
  }
}
