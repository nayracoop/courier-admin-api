const { postClient } = require('../../../operations/xubio')

// response not being considered
const afterSaveClient = async (req, res) => {
  try {
    const { clientId } = req.params
    const query = new Parse.Query('Client')
    query.doesNotExist('deletedAt')
    query.doesNotExist('synchedAt')
    query.limit(1000)
    const client = await query.get(clientId)

    if (client) {
      let xubioClient = client.castToXubio()
      try {
        xubioClient = await postClient(xubioClient)
      } catch (error) {
        client.set('syncError', error.message)
        await client.save()
        return res.error(2000, {
          message: 'Se produjo un error al intentar sincronizar al cliente',
          internalMessage: error.message
        })
      }
      client.set('synchedAt', new Date())
      client.set('externalId', xubioClient.cliente_id)
      await client.save()
      return res.success({
        message: `Se sincronizó el cliente ${clientId}. Id remoto: ${xubioClient.cliente_id}`
      })
    }
  } catch (error) {
    console.error(error.code, error.message)
    return res.error(2001, {
      message: 'Se produjo un error al intentar sincronizar al cliente',
      internalMessage: error.message
    })
  }
}

module.exports = {
  afterSaveClient
}
