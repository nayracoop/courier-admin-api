var xubioService = require('../../services/xubio')
var Provider = require('../../models/provider.js')

module.exports = {

  providerSync: (req, res) => {
    // basic validations
    //if (!req.params.providers.length) {
    //  res.error('No providers received')
    //}

    // get xubio token. xubio.service
    xubioService.credential.getToken()
      .then(token => {
        // get all providers from Xubio
        xubioService.provider.getAll(token.token_type, token.access_token)
          .then(providers => {
              processSync(token, providers,res)
              //processExp(token, providers,res)
          }).catch()

      })
      .catch(error => {
        console.log(error)
      })
  }
}

//not used
function getAllParseProviders () {
    parseProviders().then( providers => {
         return providers
    }).catch( error => {console.log(error)});
}

//look for parse Provider by externalId
async function getProviderById (id) {
  //console.log(token)
  let query = new Parse.Query('Provider')
  var res =
  query.doesNotExist('deletedAt')
  query.equalTo("externalId", id)
  return query.find()
}


// update provider received in Parse
//**not used yet
function updateProvider (provider) {
  let myProvider = Provider.createFromXubio(provider)
  // check if Provider exists: update or save. models.provider
  // let query = new Parse.Query("Provider");
  // query.equalTo('externalId', provider.get('externalId'));
  return myProvider.save()
}

//experimental
async function processSync (token, providers, res) {
  var list = []

  for (const item of providers) {

      results =  await getProviderById(item.proveedorid)

      if (results.length === 0) {
          console.log("ID "+item.proveedorid+"  no está en courier lo sincronizamos")
          list.push(item)
      } else {
          //get all fields from Provider - xubioService
          let xubio = await getXubioPovider(item.proveedorid, token)
          // check if all field are equals
          if (providerEquals(xubio, results[0])) {
              console.log("This item "+xubio.proveedorid+" "+xubio.nombre+" is already synched")
          } else {
              list.push(item)
              console.log("This item "+xubio.proveedorid+" "+xubio.nombre+" has to be updated")
          }
      }
  }
  // send a response with all the providers not synched with xubio (new and not updated)
  res.success(list)
}

//get the provider from xubio async
async function getXubioPovider(proveedorId, token) {
    return xubioService.provider.getById(proveedorId, token.token_type, token.access_token)
}

//check if both providers are equal
function providerEquals (xubio, courier) {
     //console.log(" "+JSON.stringify(courier.get("province")))
     //console.log(" "+JSON.stringify(xubio.provincia))

    if(courier.get("vatId") != xubio.CUIT) return false

    if(JSON.stringify(courier.get("taxCategory")) != JSON.stringify(xubio.categoriaFiscal)) return false

    if(courier.get("postalCode") != xubio.codigoPostal) return false

    if(JSON.stringify(courier.get("purchaseAccount")) != JSON.stringify(xubio.cuentaCompra_id))return false
    if(JSON.stringify(courier.get("saleAccount")) != JSON.stringify(xubio.cuentaVenta_id)) return false

    if(courier.get("address") != xubio.direccion) return false
    if(courier.get("email") != xubio.email) return false

    if(JSON.stringify(courier.get("taxType")) != JSON.stringify(xubio.identificacionTributaria)) return false

    if(courier.get("name") != xubio.nombre) return false
    if(courier.get("observation") != xubio.observaciones) return false

    if(JSON.stringify(courier.get("country")) != JSON.stringify(xubio.pais)) return false

    if(courier.get("externalId") != xubio.proveedorid) return false

    if(JSON.stringify(courier.get("province")) != JSON.stringify(xubio.provincia)) return false

    if(courier.get("businessName") != xubio.razonSocial) return false
    if(courier.get("phone") != xubio.telefono) return false
    if(courier.get("userCode") != xubio.usrCode) return false
    return true
}
