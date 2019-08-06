const { getToken } = require('../../../operations/xubio/security/get-token-operation')
const { getProviders } = require('../../../operations/xubio/provider/get-providers-operation')

const { getProvidersUnsynched } = require('../../../operations/providers/get-providers-unsynched-operation')
const { getProvidersNotInExternalIds } = require('../../../operations/providers/get-providers-not-in-externalIds-operation')
const { Provider } = require('../../../models/provider')

const syncProviders = async (req, res) => {
  try {
    const xubioToken = await getToken()

    let xubioProviders = null

    try {
      xubioProviders = await getProviders(xubioToken)
    } catch (error) {
      return res.error(1004, {
        message: 'Se produjo un error obteniendo los detalles para sincronización',
        internalMessage: error.message
      })
    }

    const getXubioProvidersPromise = getProvidersNotInExternalIds(xubioProviders)
    const getLocalProvidersPromise = getProvidersUnsynched()

    const unsynchedXubioProviders = await getXubioProvidersPromise
    const unsynchedParseProviders = await getLocalProvidersPromise

    const createProvidersPromises = unsynchedXubioProviders.map(Provider.createFromXubio)
    const sendProvidersPromises = unsynchedParseProviders.map(provider => provider.sendToXubio(xubioToken))

    await Promise.all(createProvidersPromises.concat(sendProvidersPromises))

    const message = `Sincronizado con Xubio. ${unsynchedXubioProviders.length} recibidos. ${unsynchedParseProviders.length} enviados.`

    res.success({
      message,
      xubio: unsynchedXubioProviders.length,
      parse: unsynchedParseProviders.length
    })
  } catch (error) {
    return res.error(1005, {
      message: 'Se produjo un error obteniendo los detalles para sincronización',
      internalMessage: error.message
    })
  }
}

module.exports = {
  syncProviders
}
