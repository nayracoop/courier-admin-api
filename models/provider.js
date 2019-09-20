class Provider extends Parse.Object {
  constructor () {
    super('Provider')
  }

  castToXubio () {
    const xubioProvider = {}
    const address = this.get('address')

    xubioProvider.nombre = this.get('name')
    xubioProvider.identificacionTributaria = {
      ID: this.get('docType')
    }
    xubioProvider.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioProvider.provincia = {
      ID: address ? address.province : 43
    }
    xubioProvider.direccion = address ? address.streetAddress : ''
    xubioProvider.email = this.get('email')
    xubioProvider.telefono = this.get('phone')
    xubioProvider.razonSocial = this.get('businessName')
    xubioProvider.codigoPostal = address ? address.postalCode : ''
    xubioProvider.cuentaVenta_id = {
      ID: this.get('saleAccount')
    }
    xubioProvider.cuentaCompra_id = {
      ID: this.get('purchaseAccount')
    }
    xubioProvider.pais = {
      ID: address ? address.country : 1
    }
    xubioProvider.usrCode = this.get('userCode')
    xubioProvider.observaciones = this.get('observation')
    xubioProvider.CUIT = this.get('docValue')

    return xubioProvider
  }

  static async createFromXubio (xubioProvider) {
    var provider = new Provider()

    try {
      provider.set('externalId', xubioProvider.proveedorid)
      provider.set('docValue', xubioProvider.CUIT)
      provider.set('taxCategory', xubioProvider.categoriaFiscal && xubioProvider.categoriaFiscal.ID)
      provider.set('purchaseAccount', xubioProvider.cuentaCompra_id && xubioProvider.cuentaCompra_id.ID)
      provider.set('saleAccount', xubioProvider.cuentaVenta_id && xubioProvider.cuentaVenta_id.ID)
      provider.set('email', xubioProvider.email)
      provider.set('docType', xubioProvider.identificacionTributaria && xubioProvider.identificacionTributaria.ID)
      provider.set('name', xubioProvider.nombre)

      provider.set('address', {
        streetAddress: xubioProvider.direccion,
        postalCode: xubioProvider.codigoPostal,
        province: xubioProvider.provincia ? xubioProvider.provincia.ID : null,
        country: xubioProvider.pais ? xubioProvider.pais.ID : null
      })

      provider.set('observation', xubioProvider.observaciones)
      provider.set('businessName', xubioProvider.razonSocial)
      provider.set('phone', xubioProvider.telefono)
      provider.set('userCode', xubioProvider.usrCode)
      provider.set('synchedAt', new Date())

      provider.set('costsTable', [])
      provider.set('shippingZones', [])
      provider.set('fuelTable', [])

      await provider.save()
      return provider
    } catch (e) {
      console.error(e.code, e.message)
      throw (e)
    }
  }
}

Parse.Object.registerSubclass('Provider', Provider)

module.exports = {
  Provider
}
