class Client extends Parse.Object {
  constructor () {
    super('Client')
  }

  castToXubio () {
    const xubioClient = {}
    const address = this.get('address')

    xubioClient.nombre = this.get('name')
    xubioClient.identificacionTributaria = {
      ID: this.get('docType')
    }
    xubioClient.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioClient.provincia = {
      ID: address ? address.province : 43
    }
    xubioClient.direccion = address ? address.streetAddress : ''
    xubioClient.email = this.get('email')
    xubioClient.telefono = this.get('phone')
    xubioClient.razonSocial = this.get('businessName')
    xubioClient.codigoPostal = address ? address.postalCode : ''
    xubioClient.cuentaVenta_id = {
      ID: this.get('saleAccount')
    }
    xubioClient.cuentaCompra_id = {
      ID: this.get('purchaseAccount')
    }
    xubioClient.pais = {
      ID: address ? address.country : 1
    }
    xubioClient.usrCode = this.get('userCode')
    xubioClient.CUIT = this.get('docValue')

    xubioClient.descripcion = this.get('observation')

    return xubioClient
  }

  static async createFromXubio (xubioClient) {
    var client = new Client()

    try {
      client.set('externalId', xubioClient.cliente_id)
      client.set('docValue', xubioClient.CUIT)
      client.set('taxCategory', (xubioClient.categoriaFiscal ? xubioClient.categoriaFiscal.ID : null))
      client.set('purchaseAccount', (xubioClient.cuentaCompra_id ? xubioClient.cuentaCompra_id.ID : null))
      client.set('saleAccount', (xubioClient.cuentaVenta_id ? xubioClient.cuentaVenta_id.ID : null))
      client.set('email', xubioClient.email)
      client.set('docType', (xubioClient.identificacionTributaria ? xubioClient.identificacionTributaria.ID : null))
      client.set('name', xubioClient.nombre)

      client.set('address', {
        streetAddress: xubioClient.direccion,
        postalCode: xubioClient.codigoPostal,
        province: xubioClient.provincia ? xubioClient.provincia.ID : null,
        country: xubioClient.pais ? xubioClient.pais.ID : null
      })

      client.set('observation', xubioClient.descripcion)
      client.set('businessName', xubioClient.razonSocial)
      client.set('phone', xubioClient.telefono)
      client.set('userCode', xubioClient.usrCode)
      client.set('synchedAt', new Date())

      client.set('costsTable', [])
      client.set('addresses', [])

      await client.save()
      return client
    } catch (e) {
      console.error(e.code, e.message)
      throw (e)
    }
  }
}

Parse.Object.registerSubclass('Client', Client)

module.exports = {
  Client
}
