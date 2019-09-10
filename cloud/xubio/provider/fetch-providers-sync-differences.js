// const { getToken } = require('../../../operations/xubio/security/get-token-operation')
// const { getProviders } = require('../../../operations/xubio/provider/get-providers-operation')

const { getProvidersUnsynched } = require('../../../operations/providers/get-providers-unsynched-operation')
// const { getProvidersNotInExternalIds } = require('../../../operations/providers/get-providers-not-in-externalIds-operation')

const fetchProvidersSyncDifferences = async (req, res) => {
  try {
    let canSync = false
    // const xubioToken = await getToken()

    // let xubioProviders = null

    // try {
    //   xubioProviders = await getProviders(xubioToken)
    // } catch (error) {
    //   return res.error(1002, {
    //     message: 'Se produjo un error obteniendo los detalles para sincronización',
    //     internalMessage: error.message
    //   })
    // }

    // const getXubioProvidersPromise = getProvidersNotInExternalIds(xubioProviders)
    const getLocalProvidersPromise = getProvidersUnsynched()

    // const unsynchedXubioProviders = await getXubioProvidersPromise
    const unsynchedParseProviders = await getLocalProvidersPromise

    // if (unsynchedXubioProviders.length + unsynchedParseProviders.length > 0) {
    //   canSync = true
    // }
    canSync = unsynchedParseProviders.length > 0

    return res.success({
      canSync,
      // xubio: unsynchedXubioProviders.length,
      xubio: 0,
      parse: unsynchedParseProviders.length
    })
  } catch (error) {
    return res.error(1003, {
      message: 'Se produjo un error obteniendo los detalles para sincronización',
      internalMessage: error.message
    })
  }
}

module.exports = {
  fetchProvidersSyncDifferences
}
