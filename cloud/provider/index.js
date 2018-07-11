var xubioService = require('../../services/xubio')
var Provider = require('../../models/provider.js')

module.exports = {
  providerSync: (req, res) => {
    // basic validations
    if (!req.params.providers.length) {
      res.error('No providers received')
    }

    // get xubio token. xubio.service
    xubioService.credential.getToken()
      .then(token => {
        // foreach, get providers from Xubio. xubio.service
        processSync(token, req.params.providers)
          .then(provider => {
            res.success(provider)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function processSync (token, providers) {
  providers.forEach(provider => {
    xubioService.provider.getById(provider.id, token.token_type, token.access_token)
      .then(provider => {
        // foreach, create Provider entity from Xubio Provider. models.provider
        return updateProvider(provider)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

// update provider received in Parse
function updateProvider (provider) {
  let myProvider = Provider.createFromXubio(provider)
  // check if Provider exists: update or save. models.provider
  // let query = new Parse.Query("Provider");
  // query.equalTo('externalId', provider.get('externalId'));
  return myProvider.save()
}
