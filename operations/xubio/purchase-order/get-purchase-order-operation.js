/* eslint camelcase: 0 */
const rp = require('request-promise')
const { PURCHASE_ORDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @purchaseOrderId string
// returns xubio purchaseOrder for the given id
const getPurchaseOrder = async ({ token_type, access_token }, purchaseOrderId) => {
  try {
    const xubioApiPurchaseOrderEndpoint = `${process.env.XUBIO_API_URI}${PURCHASE_ORDER_BEAN_PATH}/${purchaseOrderId}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiPurchaseOrderEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const purchaseOrder = await rp(options)
    return purchaseOrder
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getPurchaseOrder
}
