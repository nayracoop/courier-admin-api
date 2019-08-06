const { afterSaveClient } = require('./after-save-client')
const { fetchClientsSyncDifferences } = require('./fetch-clients-sync-differences')
const { syncClients } = require('./sync-clients')

module.exports = {
  afterSaveClient,
  fetchClientsSyncDifferences,
  syncClients
}
