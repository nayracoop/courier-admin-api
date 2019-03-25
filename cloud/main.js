const client = require('./client')
const provider = require('./provider')
const ups = require('./ups')
const user = require('./user')
const products = require('./products')
const purchaseOrder = require('./purchase_order')
const budget = require('./budget')

const { clientsSync } = require('./client/clients-sync-cloud')

Parse.Cloud.define('ClientSync', client.clientSync)
Parse.Cloud.define('ProviderSync', provider.providerSync)
Parse.Cloud.define('UpsLabelRecovery', ups.labelRecovery)

Parse.Cloud.define('CreateUser', user.createUser)
Parse.Cloud.define('GetAllUsers', user.getAllUsers)
Parse.Cloud.define('GetUserById', user.getUserById)
Parse.Cloud.define('UpdateUser', user.updateUser)

Parse.Cloud.define('GetProducts', products.getProducts)

Parse.Cloud.define('CreatePurchaseOrder', purchaseOrder.createPurchaseOrder)
Parse.Cloud.define('CreateBudget', budget.createBudget)

Parse.Cloud.define('ClientsSyncCloud', clientsSync)
