var rp = require('request-promise')

// @tokenType string
// @accessToken string
// returns every xubio client associated to the token's account
const getClients = async (tokenType, accessToken) => {
  let xubioApiClientEndpoint = process.env.XUBIO_API_URI + 'clienteBean'
  let headers = {
    'Authorization': tokenType + ' ' + accessToken
  }
  let options = {
    url: xubioApiClientEndpoint,
    method: 'GET',
    headers,
    json: true
  }
  const clients = await rp(options)
  return clients
}

module.exports = getClients
