var rp = require('request-promise')

module.exports = {
  getById: function (providerId, tokenType, accessToken) {
    let xubioApiProviderEndpoint = process.env.XUBIO_API_URI + 'ProveedorBean/' + providerId
    let headers = {
      'Authorization': tokenType + ' ' + accessToken
    }
    let options = {
      url: xubioApiProviderEndpoint,
      method: 'GET',
      headers: headers,
      json: true
    }
    return rp(options)
  },

  getAll: function (tokenType, accessToken) {
    let xubioApiProviderEndpoint = process.env.XUBIO_API_URI + 'ProveedorBean'
    let headers = {
      'Authorization': tokenType + ' ' + accessToken
    }
    let options = {
      url: xubioApiProviderEndpoint,
      method: 'GET',
      headers: headers,
      json: true
    }
    return rp(options)
  }
}
