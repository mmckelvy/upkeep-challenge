const Boom = require('boom')
const { requestAsync: request } = require('./utils')

module.exports = async function login(req, res, next) {
  try {
    // Make a request to the UpKeep api
    const { response, body } = await request({
      method: 'POST',
      url: 'https://api.onupkeep.com/api/v2/auth/',
      json: req.body,
    })

    res.status(200).json(body.result)

  } catch (err) {
    next(err)
  }
}
