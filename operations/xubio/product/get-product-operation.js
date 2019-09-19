/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PRODUCT_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @productId string
// returns xubio product for the given id
const getProduct = async ({ token_type, access_token }, productId) => {
  try {
    const xubioApiProductEndpoint = `${process.env.XUBIO_API_URI}${PRODUCT_BEAN_PATH}/${productId}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiProductEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const product = await rp(options)
    return product
  } catch (e) {
    console.error(e.code, e.message)
    throw (e)
  }
}

module.exports = {
  getProduct
}
