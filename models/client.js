const commonFunctions = require('../common/functions')

class Client extends Parse.Object {
  constructor () {
    super('Client')
  }

  castToXubio () {
    const xubioClient = {}
    const address = this.get('address')

    const province = address && address.province ? commonFunctions.getArgProvinceById(address.province) : null
    const country = address && address.country ? commonFunctions.getCountryByNumericCode(address.country) : null
    const docType = this.get('docType')

    xubioClient.nombre = this.get('name')

    // Xubio API 23/09/2019
    // {} IdentificacionTributariaBean
    // nombre string(optional)
    // codigo string(optional)
    // id integer(optional)
    xubioClient.identificacionTributaria = {
      ID: docType === 9 ? docType : 44
    }
    xubioClient.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioClient.provincia = {
      nombre: province ? province.provincia_nombre : ''
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
      nombre: country ? country.name : ''
    }
    xubioClient.usrCode = this.get('userCode')
    if (docType === 9) {
      xubioClient.CUIT = this.get('docValue')
    }

    xubioClient.descripcion = this.get('observation')

    return xubioClient
  }

  static async createFromXubio (xubioClient) {
    const client = new Client()

    const province = xubioClient && xubioClient.provincia ? commonFunctions.getArgProvinceByName(xubioClient.provincia.nombre) : null
    const country = xubioClient && xubioClient.pais ? commonFunctions.getCountryByName(xubioClient.pais.nombre) : null

    try {
      client.set('externalId', xubioClient.cliente_id)
      if (xubioClient && xubioClient.CUIT) {
        client.set('docValue', xubioClient.CUIT)
      }
      client.set('taxCategory', (xubioClient.categoriaFiscal ? xubioClient.categoriaFiscal.ID : null))
      client.set('purchaseAccount', (xubioClient.cuentaCompra_id ? xubioClient.cuentaCompra_id.ID : null))
      client.set('saleAccount', (xubioClient.cuentaVenta_id ? xubioClient.cuentaVenta_id.ID : null))
      client.set('email', xubioClient.email)

      if (xubioClient && xubioClient.identificacionTributaria) {
        client.set('docType', xubioClient.identificacionTributaria.ID)
      }
      client.set('name', xubioClient.nombre)

      client.set('address', {
        streetAddress: xubioClient.direccion,
        postalCode: xubioClient.codigoPostal,
        province: province ? province.provincia_id : '',
        country: country ? country.numericCode : ''
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
