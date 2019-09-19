/* eslint camelcase: 0 */
const rp = require('request-promise')
const { BUDGET_BEAN_PATH } = require('../beanPaths')

// @token
// + token_type string
// + access_token string
// @budgetId string
// returns xubio budget for the given id
const getBudget = async ({ token_type, access_token }, budgetId) => {
  try {
    const xubioApiBudgetEndpoint = `${process.env.XUBIO_API_URI}${BUDGET_BEAN_PATH}/${budgetId}`
    const headers = {
      'Authorization': token_type + ' ' + access_token
    }
    const options = {
      url: xubioApiBudgetEndpoint,
      method: 'GET',
      headers,
      json: true
    }
    const budget = await rp(options)
    return budget
  } catch (e) {
    console.error(e.code, e.message)
    throw (e)
  }
}

module.exports = {
  getBudget
}
