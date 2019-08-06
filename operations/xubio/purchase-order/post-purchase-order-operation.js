/* eslint camelcase: 0 */
var rp = require('request-promise')
const { PURCHASE_ORDER_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @purchaseOrder to be saved in Xubio
// returns xubio purchaseOrder created
const postPurchaseOrder = async ({ token_type, access_token }, purchaseOrder) => {
  const xubioApiPurchaseOrderEndpoint = `${process.env.XUBIO_API_URI}${PURCHASE_ORDER_BEAN_PATH}`
  const headers = {
    'Authorization': token_type + ' ' + access_token,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiPurchaseOrderEndpoint,
    method: 'POST',
    headers,
    body: purchaseOrder,
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const resPurchaseOrder = await rp(options)
  return resPurchaseOrder
}

module.exports = {
  postPurchaseOrder
}
