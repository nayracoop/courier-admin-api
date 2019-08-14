/* eslint camelcase: 0 */
var rp = require('request-promise')
const { PROVIDER_BEAN_PATH } = require('../beanPaths')
const { getToken } = require('../security/get-token-operation')

// @token
// + token_type string
// + access_token string
// @provider to be saved in Xubio
// returns xubio provider created
const postProvider = async (provider, token = null) => {
  let xubioToken = token

  if (!token) {
    xubioToken = await getToken()
  }
  const { token_type, access_token } = xubioToken
  const xubioApiProviderEndpoint = `${process.env.XUBIO_API_URI}${PROVIDER_BEAN_PATH}`
  const headers = {
    'Authorization': token_type + ' ' + access_token,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiProviderEndpoint,
    method: 'POST',
    headers,
    body: provider,
    json: true
  }

  return rp(options)
}

module.exports = {
  postProvider
}
