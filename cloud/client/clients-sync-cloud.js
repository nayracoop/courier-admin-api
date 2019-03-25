const getToken = require('../../operations/xubio/get-token-operation')
const getClients = require('../../operations/xubio/get-clients-operation')
const getClientsUnsynched = require('../../operations/clients/get-clients-unsynched-operation')
const getClientsNotInExternalIds = require('../../operations/clients/get-clients-not-in-externalIds-operation')
const Client = require('../../models/client')

const clientsSync = async (req, res) => {
  const xubioToken = await getToken()
  const xubioClients = await getClients(xubioToken)

  const getXubioClientsPromise = getClientsNotInExternalIds(xubioClients)
  const getLocalClientsPromise = getClientsUnsynched()

  const unsynchedXubioClients = await getXubioClientsPromise
  const unsynchedParseClients = await getLocalClientsPromise

  const createClientsPromises = unsynchedXubioClients.map(Client.createFromXubio)
  const sendClientsPromises = unsynchedParseClients.map(client => client.sendToXubio(xubioToken))

  await Promise.all(createClientsPromises.concat(sendClientsPromises))

  const message = `Sincronizado con Xubio. ${unsynchedXubioClients.length} recibidos. ${unsynchedParseClients.length} enviados.`

  res.success({
    message,
    synched: [
      unsynchedXubioClients,
      unsynchedParseClients
    ]
  })
}

module.exports = clientsSync
