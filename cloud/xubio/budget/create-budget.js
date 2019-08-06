const { getToken, postBudget } = require('../../../operations/xubio')
const { Budget } = require('../../../models/budget')

const createBudget = async (req, res) => {
  const { items } = req.params

  try {
    const token = await getToken()
    const budget = await postBudget(token, Budget.castToXubio(items))
    res.success(budget)
  } catch (error) {
    return res.error(3000, {
      message: 'Se produjo un error enviando el presupuesto',
      internalMessage: error.message
    })
  }
}

module.exports = {
  createBudget
}
