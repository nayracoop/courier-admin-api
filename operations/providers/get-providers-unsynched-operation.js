const getProvidersUnsynched = async () => {
  const query = new Parse.Query('Provider')
  query.doesNotExist('deletedAt')
  query.equalTo('synchedAt', null)
  query.limit(1000)
  const clients = await query.find()
  return clients
}

module.exports = {
  getProvidersUnsynched
}
