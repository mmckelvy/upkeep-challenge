const Boom = require('boom')
const { requestAsync: request } = require('./utils')

module.exports = async function logout(req, res, next) {
  try {
    const [ scheme, token ] = req.header('authorization').split(' ')

    const { response, body } = await request({
      method: 'DELETE',
      url: 'https://api.onupkeep.com/api/v2/auth/',
      // Pass in the session token
      headers: {
        'Session-Token': token
      }
    })

    res.status(200).end()

  } catch (err) {
    next(err)
  }
}

