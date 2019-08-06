const _ = require('lodash')

const getClientsNotInExternalIds = async (xubioClients) => {
  const xubioClientsIds = _.map(xubioClients, 'cliente_id')

  const query = new Parse.Query('Client')
  query.containedIn('externalId', xubioClientsIds)
  const clients = await query.find()

  const filteredClients = xubioClients.filter(xubioClient =>
    !clients.some(client => client.get('externalId').toString() === xubioClient.cliente_id.toString())
  )

  return filteredClients
}

module.exports = {
  getClientsNotInExternalIds
}
