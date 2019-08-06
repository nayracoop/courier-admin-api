/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PROVIDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @providerId string
// returns xubio provider for the given id
const getProvider = async ({ token_type, access_token }, providerId) => {
  try {
    const xubioApiProviderEndpoint = `${process.env.XUBIO_API_URI}${PROVIDER_BEAN_PATH}/${providerId}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiProviderEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const provider = await rp(options)
    return provider
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getProvider
}
