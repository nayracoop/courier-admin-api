const _ = require('lodash')

const getProvidersNotInExternalIds = async (xubioProvider) => {
  const xubioProviderIds = _.map(xubioProvider, 'proveedorid')

  const query = new Parse.Query('Provider')
  query.containedIn('externalId', xubioProviderIds)
  const providers = await query.find()

  const filteredProvider = xubioProvider.filter(xubioProvider =>
    !providers.some(provider => provider.get('externalId').toString() === xubioProvider.proveedorid.toString())
  )

  return filteredProvider
}

module.exports = {
  getProvidersNotInExternalIds
}
