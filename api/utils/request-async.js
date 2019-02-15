const request = require('request')

module.exports = function requestAsync(options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        return reject(err)
      }

      resolve({response, body})
    })
  })
}
