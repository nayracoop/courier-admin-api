const { getToken } = require('../../../operations/xubio/security/get-token-operation')
const { getProvider } = require('../../../operations/xubio/provider/get-provider-operation')
const { getProviders } = require('../../../operations/xubio/provider/get-providers-operation')

const { postProvider } = require('../../../operations/xubio/provider/post-provider-operation')

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
    const providersToBeSent = unsynchedParseProviders.map(provider => provider.castToXubio())

    const fullUnsynchedXubioProviders = await Promise.all(unsynchedXubioProviders.map(provider => getProvider(xubioToken, provider.proveedorid)))

    const createProvidersPromises = fullUnsynchedXubioProviders.map(Provider.createFromXubio)
    const sendProvidersPromises = providersToBeSent.map(postProvider)

    await Promise.all(createProvidersPromises.concat(sendProvidersPromises))

    const message = `Sincronizado con Xubio. ${unsynchedXubioProviders.length} recibidos. ${unsynchedParseProviders.length} enviados.`

    res.success({
      message,
      xubio: unsynchedXubioProviders.length,
      parse: unsynchedParseProviders.length
    })
  } catch (error) {
    return res.error(1005, {
      friendlyMessage: 'Se produjo un error al intentar sincronizar',
      internalMessage: error.message
    })
  }
}

module.exports = {
  syncProviders
}
