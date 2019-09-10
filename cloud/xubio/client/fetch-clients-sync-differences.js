// const { getToken } = require('../../../operations/xubio/security/get-token-operation')
// const { getClients } = require('../../../operations/xubio/client/get-clients-operation')

const { getClientsUnsynched } = require('../../../operations/clients/get-clients-unsynched-operation')
// const { getClientsNotInExternalIds } = require('../../../operations/clients/get-clients-not-in-externalIds-operation')

const fetchClientsSyncDifferences = async (req, res) => {
  try {
    let canSync = false
    // const xubioToken = await getToken()

    // let xubioClients = null

    // try {
    //   xubioClients = await getClients(xubioToken)
    // } catch (error) {
    //   return res.error(2002, {
    //     message: 'Se produjo un error obteniendo los detalles para sincronización',
    //     internalMessage: error.message
    //   })
    // }

    // const getXubioClientsPromise = getClientsNotInExternalIds(xubioClients)
    const getLocalClientsPromise = getClientsUnsynched()

    // const unsynchedXubioClients = await getXubioClientsPromise
    const unsynchedParseClients = await getLocalClientsPromise

    // if (unsynchedXubioClients.length + unsynchedParseClients.length > 0) {
    //   canSync = true
    // }
    canSync = unsynchedParseClients.length > 0

    return res.success({
      canSync,
      // xubio: unsynchedXubioClients.length,
      xubio: 0,
      parse: unsynchedParseClients.length
    })
  } catch (error) {
    return res.error(2003, {
      message: 'Se produjo un error obteniendo los detalles para sincronización',
      internalMessage: error.message
    })
  }
}

module.exports = {
  fetchClientsSyncDifferences
}
