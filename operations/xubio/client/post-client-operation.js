/* eslint camelcase: 0 */
const rp = require('request-promise')
const { CLIENT_BEAN_PATH } = require('../beanPaths')
const { getToken } = require('../security/get-token-operation')

// @token (optional)
// + token_type string
// + access_token string
// @client to be saved in Xubio
// returns xubio client created
const postClient = async (client, token = null) => {
  let xubioToken = token

  if (!token) {
    xubioToken = await getToken()
  }
  const { token_type, access_token } = xubioToken
  const xubioApiClientEndpoint = `${process.env.XUBIO_API_URI}${CLIENT_BEAN_PATH}`
  const headers = {
    'Authorization': token_type + ' ' + access_token,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiClientEndpoint,
    method: 'POST',
    headers,
    body: client,
    json: true
  }

  console.log(options)
  return Promise.resolve()
  // return rp(options)
}

module.exports = {
  postClient
}
