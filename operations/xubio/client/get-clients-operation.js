/* eslint camelcase: 0 */
const rp = require('request-promise')
const { CLIENT_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @access_token string
// returns every xubio client associated to the token's account
const getClients = async ({ token_type, access_token }) => {
  try {
    const xubioApiClientEndpoint = `${process.env.XUBIO_API_URI}${CLIENT_BEAN_PATH}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiClientEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const clients = await rp(options)
    return clients
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getClients
}
