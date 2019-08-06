/* eslint camelcase: 0 */
var rp = require('request-promise')
const { PRODUCT_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @product to be saved in Xubio
// returns xubio client created
const postProduct = async ({ token_type, access_token }, product) => {
  const xubioApiProductEndpoint = `${process.env.XUBIO_API_URI}${PRODUCT_BEAN_PATH}`
  const headers = {
    'Authorization': token_type + ' ' + access_token,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiProductEndpoint,
    method: 'POST',
    headers,
    body: product,
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const resProduct = await rp(options)
  return resProduct
}

module.exports = {
  postProduct
}
