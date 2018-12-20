var rp = require('request-promise')

module.exports = {
  // getById: function (clientId, tokenType, accessToken) {
  //   let xubioApiClientEndpoint = process.env.XUBIO_API_URI + 'clienteBean/' + clientId
  //   let headers = {
  //     'Authorization': tokenType + ' ' + accessToken
  //   }
  //   let options = {
  //     url: xubioApiClientEndpoint,
  //     method: 'GET',
  //     headers: headers,
  //     json: true
  //   }
  //   return rp(options)
  // },
  getAll: function (tokenType, accessToken) {
    let xubioApiProductsEndpoint = process.env.XUBIO_API_URI + 'ProductoCompraBean'
    let headers = {
      'Authorization': tokenType + ' ' + accessToken
    }
    let options = {
      url: xubioApiProductsEndpoint,
      method: 'GET',
      headers: headers,
      json: true
    }
    return rp(options)
  }
}
