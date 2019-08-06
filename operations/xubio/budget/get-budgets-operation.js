/* eslint camelcase: 0 */
const rp = require('request-promise')
const { BUDGET_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @access_token string
// returns every xubio budget associated to the token's account
const getBudgets = async ({ token_type, access_token }) => {
  try {
    const xubioApiBudgetEndpoint = `${process.env.XUBIO_API_URI}${BUDGET_BEAN_PATH}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiBudgetEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const budgets = await rp(options)
    return budgets
  } catch (e) {
    console.error(e)
    throw (e)
  }
}

module.exports = {
  getBudgets
}
