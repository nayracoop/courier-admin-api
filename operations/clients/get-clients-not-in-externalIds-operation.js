const Client = require('../../models/client')

const getClientsNotInExternalIds = async (xubioClients) => {
  const query = new Parse.Query(Client)
  query.doesNotExist('deletedAt')
  const clients = await query.find()

  const filteredClients = xubioClients.filter(xubioClient =>
    !clients.some(client => client.get('externalId') === xubioClient.cliente_id.toString())
  )

  return filteredClients
}

module.exports = {
  getClientsNotInExternalIds
}
