const { getBudget } = require('./budget/get-budget-operation')
const { getBudgets } = require('./budget/get-budgets-operation')
const { postBudget } = require('./budget/post-budget-operation')

const { getClient } = require('./client/get-client-operation')
const { getClients } = require('./client/get-clients-operation')
const { postClient } = require('./client/post-client-operation')

const { getProduct } = require('./product/get-product-operation')
const { getProducts } = require('./product/get-products-operation')
const { postProduct } = require('./product/post-product-operation')

const { getProvider } = require('./provider/get-provider-operation')
const { getProviders } = require('./provider/get-providers-operation')
const { postProvider } = require('./provider/post-provider-operation')

const { getPurchaseOrder } = require('./purchase-order/get-purchase-order-operation')
const { getPurchaseOrders } = require('./purchase-order/get-purchase-orders-operation')
const { postPurchaseOrder } = require('./purchase-order/post-purchase-order-operation')

const { getToken } = require('./security/get-token-operation')

module.exports = {
  getBudget,
  getBudgets,
  postBudget,
  getClient,
  getClients,
  postClient,
  getProduct,
  getProducts,
  postProduct,
  getProvider,
  getProviders,
  postProvider,
  getPurchaseOrder,
  getPurchaseOrders,
  postPurchaseOrder,
  getToken
}
