const Boom = require('boom')

module.exports = function authenticateRequest(req, res, next) {
  // No auth, send back a 401.
  if (!req.header('authorization')) {
    return next(Boom.unauthorized('No authorization header'))
  }

  const [ scheme, token ] = req.header('authorization').split(' ')

  /*
  Inappropriate scheme or no token.

  Note that in a production system we could actually verify the session token
  but for purposes of this exercise we are just going to pass it on through to the
  UpKeep API.
  */
  if (scheme !== 'Bearer' || !token) {
    return next(Boom.unauthorized('Invalid scheme or token'))
  }

  // We have the right scheme and token, pass things along.
  next()
}
