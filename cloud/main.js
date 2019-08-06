const { createBudget } = require('./xubio/budget')
const { afterSaveClient, fetchClientsSyncDifferences, syncClients } = require('./xubio/client')
const { fetchProducts } = require('./xubio/product')
const { createPurchaseOrder } = require('./xubio/purchase_order')
const { afterSaveProvider, fetchProvidersSyncDifferences, syncProviders } = require('./xubio/provider')
const { createUser, getAllUsers, getUserById, updateUser } = require('./user')

/** XUBIO INTERFACE */
// BUDGETS are not in Parse, create only
Parse.Cloud.define('CreateXubioBudget', createBudget)

// CLIENTS - Get differences, sync or create client in Xubio
Parse.Cloud.define('FetchXubioClientsSyncDifferences', fetchClientsSyncDifferences)
Parse.Cloud.define('SyncXubioClients', syncClients)
Parse.Cloud.define('AfterSaveClient', afterSaveClient)

// PRODUCTS - Products are not in Parse, fetch only
Parse.Cloud.define('FetchXubioProducts', fetchProducts)

// PROVIDERS - Get differences, sync or create provider in Xubio
Parse.Cloud.define('FetchXubioProvidersSyncDifferences', fetchProvidersSyncDifferences)
Parse.Cloud.define('SyncXubioProviders', syncProviders)
Parse.Cloud.define('AfterSaveProvider', afterSaveProvider)

// PURCHASE ORDERS - Purchase Orders are not in Parse, create only
Parse.Cloud.define('CreateXubioPurchaseOrder', createPurchaseOrder)
/** END XUBIO INTERFACE */

// User methods
Parse.Cloud.define('CreateUser', createUser)
Parse.Cloud.define('GetAllUsers', getAllUsers)
Parse.Cloud.define('GetUserById', getUserById)
Parse.Cloud.define('UpdateUser', updateUser)

// not implemented. FedEx first
// Parse.Cloud.define('UpsLabelRecovery', ups.labelRecovery)
