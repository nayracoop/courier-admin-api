/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PRODUCT_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @access_token string
// returns every xubio product associated to the token's account
const getProducts = async ({ token_type, access_token }) => {
  try {
    const xubioApiProductEndpoint = `${process.env.XUBIO_API_URI}${PRODUCT_BEAN_PATH}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiProductEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const products = await rp(options)
    return products
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getProducts
}
