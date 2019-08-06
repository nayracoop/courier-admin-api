/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PURCHASE_ORDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @access_token string
// returns every xubio purchaseOrder associated to the token's account
const getPurchaseOrders = async ({ token_type, access_token }) => {
  try {
    const xubioApiPurchaseOrderEndpoint = `${process.env.XUBIO_API_URI}${PURCHASE_ORDER_BEAN_PATH}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiPurchaseOrderEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const purchaseOrders = await rp(options)
    return purchaseOrders
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getPurchaseOrders
}
