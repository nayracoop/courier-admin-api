const getClientsUnsynched = async () => {
  const query = new Parse.Query('Client')
  query.doesNotExist('deletedAt')
  query.equalTo('synchedAt', null)
  query.limit(1000)
  const clients = await query.find()
  return clients
}

module.exports = {
  getClientsUnsynched
}
