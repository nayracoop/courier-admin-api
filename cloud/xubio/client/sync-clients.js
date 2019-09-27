const { getToken } = require('../../../operations/xubio/security/get-token-operation')
const { getClient } = require('../../../operations/xubio/client/get-client-operation')
const { getClients } = require('../../../operations/xubio/client/get-clients-operation')

const { postClient } = require('../../../operations/xubio/client/post-client-operation')

const { getClientsUnsynched } = require('../../../operations/clients/get-clients-unsynched-operation')
const { getClientsNotInExternalIds } = require('../../../operations/clients/get-clients-not-in-externalIds-operation')
const { Client } = require('../../../models/client')

const syncClients = async (req, res) => {
  try {
    const xubioToken = await getToken()

    let xubioClients = null

    try {
      xubioClients = await getClients(xubioToken)
    } catch (error) {
      return res.error(2004, {
        message: 'Se produjo un error obteniendo los detalles para sincronización',
        internalMessage: error.message
      })
    }

    const getXubioClientsPromise = getClientsNotInExternalIds(xubioClients)
    const getLocalClientsPromise = getClientsUnsynched()

    const unsynchedXubioClients = await getXubioClientsPromise
    const unsynchedParseClients = await getLocalClientsPromise
    const clientsToBeSent = unsynchedParseClients.map(client => client.castToXubio())

    const fullUnsynchedXubioClients = await Promise.all(unsynchedXubioClients.map(client => getClient(xubioToken, client.cliente_id)))

    const createClientsPromises = fullUnsynchedXubioClients.map(Client.createFromXubio)
    const sendClientsPromises = clientsToBeSent.map(client => postClient(client, xubioToken))

    await Promise.all(createClientsPromises.concat(sendClientsPromises))

    const message = `Sincronizado con Xubio. ${unsynchedXubioClients.length} recibidos. ${unsynchedParseClients.length} enviados.`

    res.success({
      message,
      xubio: unsynchedXubioClients.length,
      parse: unsynchedParseClients.length
    })
  } catch (error) {
    return res.error(2005, {
      friendlyMessage: 'Se produjo un error al intentar sincronizar',
      internalMessage: error.message
    })
  }
}

module.exports = {
  syncClients
}
