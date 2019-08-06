/* eslint camelcase: 0 */
var rp = require('request-promise')
const { BUDGET_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @budget to be saved in Xubio
// returns xubio budget created
const postBudget = async ({ token_type, access_token }, budget) => {
  const xubioApiBudgetEndpoint = `${process.env.XUBIO_API_URI}${BUDGET_BEAN_PATH}`
  const headers = {
    'Authorization': `${token_type} ${access_token}`,
    'Content-Type': 'application/json'
  }
  const options = {
    url: xubioApiBudgetEndpoint,
    method: 'POST',
    headers,
    body: budget,
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const resBudget = await rp(options)
  return resBudget
}

module.exports = {
  postBudget
}
