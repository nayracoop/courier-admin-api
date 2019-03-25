/* eslint camelcase: 0 */
var rp = require('request-promise')

// @token_type string
// @access_token string
// @client to be saved in Xubio
// returns xubio client created
const postClient = async ({ token_type, access_token }, client) => {
  const xubioApiClientEndpoint = process.env.XUBIO_API_URI + 'clienteBean'
  const headers = {
    'Authorization': token_type + ' ' + access_token,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiClientEndpoint,
    method: 'POST',
    headers,
    body: client,
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const resClient = await rp(options)
  return resClient
}

module.exports = postClient
