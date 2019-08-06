/* eslint camelcase: 0 */
var rp = require('request-promise')
const { PROVIDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @provider to be saved in Xubio
// returns xubio provider created
const postProvider = async ({ token_type, access_token }, provider) => {
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
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const resProvider = await rp(options)
  return resProvider
}

module.exports = {
  postProvider
}
