/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PROVIDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// returns every xubio provider associated to the token's account
const getProviders = async ({ token_type, access_token }) => {
  try {
    const xubioApiProviderEndpoint = `${process.env.XUBIO_API_URI}${PROVIDER_BEAN_PATH}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiProviderEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const providers = await rp(options)
    return providers
  } catch (e) {
    console.error(e.code, e.message)
    throw (e)
  }
}

module.exports = {
  getProviders
}
