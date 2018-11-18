var xubioService = require('../../services/xubio')
// var Client = require('../../models/client.js')

module.exports = {
  clientSync: (req, res) => {
    // get xubio token. xubio.service
    xubioService.credential.getToken()
      .then(token => {
      // get all clients from Xubio
        xubioService.client.getAll(token.token_type, token.access_token)
          .then(clients => {
            // res.success(clients)
            processSync(token, clients, res)
          })
          .catch()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// look for parse Client by externalId
async function getClientByExternalId (id) {
  let query = new Parse.Query('Client')
  query.doesNotExist('deletedAt')
    .equalTo('externalId', id)
  return query.find()
}

// looking for new clients from xubio
async function processSync (token, clients, res) {
  let list = []
  let xubio = null
  let results = null

  for (const item of clients) {
    results = await getClientByExternalId(item.cliente_id)

    if (results.length === 0) {
      xubio = await getXubioClient(item.cliente_id, token)
      list.push(castClient(xubio))
    }
    // else {
    //   //get all fields from Client - xubioService
    //   xubio = await getXubioClient(item.proveedorid, token)
    //   // check if all field are equals
    //   if (!clientEquals(xubio, results[0])) {
    //     list.push(castClient(xubio))
    //   }
    // }
  }
  // send a response with all the clients not synched with xubio (new)
  res.success(list)
}

// get the client from xubio async
async function getXubioClient (clientId, token) {
  return xubioService.client.getById(clientId, token.token_type, token.access_token)
}

function castClient (xubio) {
  let client = {}
  client.externalId = xubio.cliente_id
  client.docValue = xubio.CUIT
  client.taxCategory = (xubio.categoriaFiscal ? xubio.categoriaFiscal.ID : null)
  client.purchaseAccount = (xubio.cuentaCompra_id ? xubio.cuentaCompra_id.ID : null)
  client.saleAccount = (xubio.cuentaVenta_id ? xubio.cuentaVenta_id.ID : null)
  client.address = xubio.direccion
  client.email = xubio.email
  client.docType = (xubio.identificacionTributaria ? xubio.identificacionTributaria.ID : null)
  client.name = xubio.nombre
  client.country = (xubio.pais ? xubio.pais.ID : null) // va a requerir MAP
  client.province = (xubio.provincia ? xubio.provincia.ID : null) // va a requerir MAP
  client.postalCode = xubio.codigoPostal
  client.observation = xubio.observaciones
  client.businessName = xubio.razonSocial
  client.phone = xubio.telefono
  client.userCode = xubio.usrCode
  return client
}
