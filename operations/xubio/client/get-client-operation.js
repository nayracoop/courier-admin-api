/* eslint camelcase: 0 */
const rp = require('request-promise')
const { CLIENT_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @clientId string
// returns xubio client for the given id
const getClient = async ({ token_type, access_token }, clientId) => {
  try {
    const xubioApiClientEndpoint = `${process.env.XUBIO_API_URI}${CLIENT_BEAN_PATH}/${clientId}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiClientEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const client = await rp(options)
    return client
  } catch (e) {
    console.error(e.code, e.message)
    throw (e)
  }
}

module.exports = {
  getClient
}
