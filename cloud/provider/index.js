var xubioService = require('../../services/xubio')
var Provider = require('../../models/provider.js')

module.exports = {
  providerSync: (req, res) => {
    // get xubio token. xubio.service
    xubioService.credential.getToken()
      .then(token => {
        // get all providers from Xubio
        xubioService.provider.getAll(token.token_type, token.access_token)
          .then(providers => {
            processSync(token, providers, res)
          })
          .catch()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// not used
function getAllParseProviders() {
  parseProviders().then(providers => {
    return providers
  }).catch(error => {
    console.log(error)
  })
}

// look for parse Provider by externalId
async function getProviderByExternalId(id) {
  let query = new Parse.Query('Provider')
  var res = query.doesNotExist('deletedAt')
  query.equalTo("externalId", id)
  return query.find()
}

// update provider received in Parse
// not used
function updateProvider(provider) {
  let myProvider = Provider.createFromXubio(provider)
  return myProvider.save()
}

async function processSync(token, providers, res) {
  let list = []
  let xubio = null

  for (const item of providers) {
    results = await getProviderByExternalId(item.proveedorid)
    if (results.length === 0) {
      xubio = await getXubioPovider(item.proveedorid, token)
      list.push(castProvider(xubio))
    }
    // else {
    //   //get all fields from Provider - xubioService
    //   xubio = await getXubioPovider(item.proveedorid, token)
    //   // check if all field are equals
    //   if (!providerEquals(xubio, results[0])) {
    //     list.push(castProvider(xubio))
    //   }
    // }
  }
  // send a response with all the providers not synched with xubio (new and not updated)
  res.success(list)
}

//get the provider from xubio async
async function getXubioPovider(proveedorId, token) {
  return xubioService.provider.getById(proveedorId, token.token_type, token.access_token)
}

//check if both providers are equal
function providerEquals(xubio, courier) {
  if (courier.get("externalId") !== xubio.proveedorid) return false
  if (courier.get("name") !== xubio.nombre) return false
  if (courier.get("taxCategory") !== (xubio.categoriaFiscal ? xubio.categoriaFiscal.ID : null)) return false // categoría, condición frente al IVA
  if (courier.get("docType") !== (xubio.identificacionTributaria ? xubio.identificacionTributaria.ID : null)) return false // CUIT, DNI, etcétera
  if (courier.get("docValue") !== xubio.CUIT) return false // número de DNI, CUIT, etcétera
  if (courier.get("purchaseAccount") !== (xubio.cuentaCompra_id ? xubio.cuentaCompra_id.ID : null)) return false
  if (courier.get("saleAccount") !== (xubio.cuentaVenta_id ? xubio.cuentaVenta_id.ID : null)) return false
  if (courier.get("country") !== (xubio.pais ? xubio.pais.ID : null)) return false // va a requerir MAP
  if (courier.get("province") !== (xubio.provincia ? xubio.provincia.ID : null)) return false // va a requerir MAP
  if (courier.get("address") !== xubio.direccion) return false
  if (courier.get("postalCode") !== xubio.codigoPostal) return false
  if (courier.get("email") !== xubio.email) return false
  if (courier.get("observation") !== xubio.observaciones) return false
  if (courier.get("businessName") !== xubio.razonSocial) return false
  if (courier.get("phone") !== xubio.telefono) return false
  if (courier.get("userCode") !== xubio.usrCode) return false
  return true
}

function castProvider(xubio) {
  let provider = {}
  provider.externalId = xubio.proveedorid
  provider.name = xubio.nombre
  provider.taxCategory = (xubio.categoriaFiscal ? xubio.categoriaFiscal.ID : null)
  provider.docType = (xubio.identificacionTributaria ? xubio.identificacionTributaria.ID : null)
  provider.docValue = xubio.CUIT
  provider.purchaseAccount = (xubio.cuentaCompra_id ? xubio.cuentaCompra_id.ID : null)
  provider.saleAccount = (xubio.cuentaVenta_id ? xubio.cuentaVenta_id.ID : null)
  provider.country = (xubio.pais ? xubio.pais.ID : null) // va a requerir MAP
  provider.province = (xubio.provincia ? xubio.provincia.ID : null) // va a requerir MAP
  provider.address = xubio.direccion
  provider.postalCode = xubio.codigoPostal
  provider.email = xubio.email
  provider.observation = xubio.observaciones
  provider.businessName = xubio.razonSocial
  provider.phone = xubio.telefono
  provider.userCode = xubio.usrCode
  return provider
}