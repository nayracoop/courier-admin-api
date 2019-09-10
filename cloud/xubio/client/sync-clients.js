const { getToken } = require('../../../operations/xubio/security/get-token-operation')
// const { getClients } = require('../../../operations/xubio/client/get-clients-operation')

const { getClientsUnsynched } = require('../../../operations/clients/get-clients-unsynched-operation')
// const { getClientsNotInExternalIds } = require('../../../operations/clients/get-clients-not-in-externalIds-operation')
// const { Client } = require('../../../models/client')

const syncClients = async (req, res) => {
  try {
    const xubioToken = await getToken()

    // let xubioClients = null

    // try {
    //   xubioClients = await getClients(xubioToken)
    // } catch (error) {
    //   return res.error(2004, {
    //     message: 'Se produjo un error obteniendo los detalles para sincronización',
    //     internalMessage: error.message
    //   })
    // }

    // const getXubioClientsPromise = getClientsNotInExternalIds(xubioClients)
    const getLocalClientsPromise = getClientsUnsynched()

    // const unsynchedXubioClients = await getXubioClientsPromise
    const unsynchedParseClients = await getLocalClientsPromise

    // const createClientsPromises = unsynchedXubioClients.map(Client.createFromXubio)
    const sendClientsPromises = unsynchedParseClients.map(client => client.sendToXubio(xubioToken))

    // await Promise.all(createClientsPromises.concat(sendClientsPromises))
    await Promise.all(sendClientsPromises)

    // const message = `Sincronizado con Xubio. ${unsynchedXubioClients.length} recibidos. ${unsynchedParseClients.length} enviados.`
    const message = `Sincronizado con Xubio. 0 recibidos. ${unsynchedParseClients.length} enviados.`

    res.success({
      message,
      // xubio: unsynchedXubioClients.length,
      xubio: 0,
      parse: unsynchedParseClients.length
    })
  } catch (error) {
    return res.error(2005, {
      message: 'Se produjo un error obteniendo los detalles para sincronización',
      internalMessage: error.message
    })
  }
}

module.exports = {
  syncClients
}
