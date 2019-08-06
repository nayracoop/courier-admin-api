class Client extends Parse.Object {
  constructor () {
    super('Client')
  }

  castToXubio () {
    const xubioClient = {}

    xubioClient.CUIT = this.get('docValue')
    xubioClient.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioClient.cuentaCompra_id = {
      ID: this.get('purchaseAccount')
    }
    xubioClient.cuentaVenta_id = {
      ID: this.get('saleAccount')
    }
    xubioClient.direccion = this.get('address')
    xubioClient.email = this.get('email')
    xubioClient.identificacionTributaria = {
      ID: this.get('docType')
    }
    xubioClient.nombre = this.get('name')
    xubioClient.pais = {
      ID: this.get('country')
    }
    xubioClient.provincia = {
      ID: this.get('province')
    }
    xubioClient.codigoPostal = this.get('postalCode')
    xubioClient.observaciones = this.get('observation')
    xubioClient.razonSocial = this.get('businessName')
    xubioClient.telefono = this.get('phone')

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
      client.set('address', xubioClient.direccion)
      client.set('email', xubioClient.email)
      client.set('docType', (xubioClient.identificacionTributaria ? xubioClient.identificacionTributaria.ID : null))
      client.set('name', xubioClient.nombre)
      client.set('country', xubioClient.pais ? xubioClient.pais.ID : null) // va a requerir MAP
      client.set('province', xubioClient.provincia ? xubioClient.provincia.ID : null) // va a requerir MAP
      client.set('postalCode', xubioClient.codigoPostal)
      client.set('observation', xubioClient.observaciones)
      client.set('businessName', xubioClient.razonSocial)
      client.set('phone', xubioClient.telefono)
      client.set('userCode', xubioClient.usrCode)
      client.set('synchedAt', new Date())

      await client.save()
      return client
    } catch (e) {
      console.error(e)
      throw (e)
    }
  }
}

Parse.Object.registerSubclass('Client', Client)

module.exports = {
  Client
}
