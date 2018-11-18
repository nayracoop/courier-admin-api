var Client = Parse.Object.extend('Client', {
  // Instance properties go in an initialize method
  initialize: (attrs, options) => {},
  exists: () => {}
}, {
  // Class methods
  createFromXubio: function (xubioClient) {
    var client = new Client()
    client.set('vatId', client.CUIT)
    client.set('taxCategory', client.categoriaFiscal)
    client.set('postalCode', client.codigoPostal)
    client.set('purchaseAccount', client.cuentaCompra_id)
    client.set('saleAccount', client.cuentaVenta_id)
    client.set('address', client.direccion)
    client.set('email', client.email)
    client.set('taxType', client.identificacionTributaria)
    client.set('name', client.nombre)
    client.set('observation', client.observaciones)
    client.set('country', client.pais)
    client.set('externalId', client.proveedorId)
    client.set('province', client.provincia)
    client.set('businessName', client.razonSocial)
    client.set('phone', client.telefono)
    client.set('userCode', client.usrCode)

    return client
  }
})

module.exports = Client
