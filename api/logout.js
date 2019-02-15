const Boom = require('boom')
const { requestAsync: request } = require('./utils')

module.exports = async function logout(req, res, next) {
  try {
    // Make a request to the UpKeep api
    const { response, body } = await request({
      method: 'DELETE',
      url: 'https://api.onupkeep.com/api/v2/auth/',
      // Pass in the session token
      json: req.body,
    })

    // Todo: error handling

    res.status(200).end()

  } catch (err) {
    next(err)
  }
}

