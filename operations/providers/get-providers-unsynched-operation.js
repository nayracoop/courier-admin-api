const getProvidersUnsynched = async () => {
  const query = new Parse.Query('Provider')
  query.doesNotExist('deletedAt')
  query.equalTo('synchedAt', null)
  const clients = await query.find()
  return clients
}

module.exports = {
  getProvidersUnsynched
}
