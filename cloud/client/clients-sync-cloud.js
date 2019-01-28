const { getToken } = require('../../operations/xubio/get-token-operation')
const { getClients } = require('../../operations/xubio/get-clients-operation')
const { getClientsUnsynched } = require('../../operations/clients/get-clients-unsynched-operation')
const { getClientsNotInExternalIds } = require('../../operations/clients/get-clients-not-in-externalIds-operation')
const Client = require('../../models/client')

const clientsSync = async (req, res) => {
  const xubioToken = await getToken()
  const xubioClients = await getClients(xubioToken.token_type, xubioToken.access_token)

  const unsynchedXubioClients = await getClientsNotInExternalIds(xubioClients)
  for (const client of unsynchedXubioClients) {
    await Client.createFromXubio(client)
  }

  const unsynchedParseClients = await getClientsUnsynched()
  for (const client of unsynchedParseClients) {
    await client.sendToXubio()
  }

  res.success(`Sincronizado con Xubio. ${unsynchedXubioClients.length} recibidos. ${unsynchedParseClients.length} enviados.`)
}

module.exports = {
  clientsSync
}
