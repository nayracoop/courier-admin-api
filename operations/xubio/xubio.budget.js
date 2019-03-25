var rp = require('request-promise')

module.exports = {
  getAll: function (tokenType, accessToken) {
    let xubioApiPurchaseOrderEndpoint = process.env.XUBIO_API_URI + 'presupuestoBean'
    let headers = {
      'Authorization': tokenType + ' ' + accessToken
    }
    let options = {
      url: xubioApiPurchaseOrderEndpoint,
      method: 'GET',
      headers: headers,
      json: true
    }
    return rp(options)
  },

  create: function (tokenType, accessToken, data) {
    let xubioApiPurchaseOrderEndpoint = process.env.XUBIO_API_URI + 'presupuestoBean'
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': tokenType + ' ' + accessToken
    }
    // let dataString = JSON.stringify(data)
    // console.log(dataString)
    let options = {
      url: xubioApiPurchaseOrderEndpoint,
      method: 'POST',
      headers: headers,
      body: data,
      json: true
    }
    return rp(options)
  }
}
