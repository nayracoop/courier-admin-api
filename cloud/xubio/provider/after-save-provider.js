const { postProvider } = require('../../../operations/xubio')

// response not being considered
const afterSaveProvider = async (req, res) => {
  try {
    const { providerId } = req.params
    const query = new Parse.Query('Provider')
    query.doesNotExist('deletedAt')
    query.doesNotExist('synchedAt')
    query.limit(1000)
    const provider = await query.get(providerId)

    if (provider) {
      let xubioProvider = provider.castToXubio()
      try {
        xubioProvider = await postProvider(xubioProvider)
      } catch (error) {
        provider.set('syncError', error.message)
        await provider.save()
        return res.error(1000, {
          message: 'Se produjo un error al intentar sincronizar al proveedor',
          internalMessage: error.message
        })
      }
      provider.set('synchedAt', new Date())
      provider.set('externalId', xubioProvider.proveedorid)
      await provider.save()
      return res.success({
        message: `Se sincronizó el proveedor ${providerId}. Id remoto: ${xubioProvider.providere_id}`
      })
    }
  } catch (error) {
    console.error(error.code, error.message)
    return res.error(1001, {
      message: 'Se produjo un error al intentar sincronizar al proveedor',
      internalMessage: error.message
    })
  }
}

module.exports = {
  afterSaveProvider
}
