class Provider extends Parse.Object {
  constructor () {
    super('Provider')
  }

  castToXubio () {
    const xubioProvider = {}

    xubioProvider.CUIT = this.get('docValue')
    xubioProvider.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioProvider.cuentaCompra_id = {
      ID: this.get('purchaseAccount')
    }
    xubioProvider.cuentaVenta_id = {
      ID: this.get('saleAccount')
    }
    xubioProvider.direccion = this.get('address')
    xubioProvider.email = this.get('email')
    xubioProvider.identificacionTributaria = {
      ID: this.get('docType')
    }
    xubioProvider.nombre = this.get('name')
    xubioProvider.pais = {
      ID: this.get('country')
    }
    xubioProvider.provincia = {
      ID: this.get('province')
    }
    xubioProvider.codigoPostal = this.get('postalCode')
    xubioProvider.observaciones = this.get('observation')
    xubioProvider.razonSocial = this.get('businessName')
    xubioProvider.telefono = this.get('phone')

    return xubioProvider
  }

  static async createFromXubio (xubioProvider) {
    var provider = new Provider()

    try {
      provider.set('externalId', xubioProvider.proveedorid)
      provider.set('vatId', xubioProvider.CUIT)
      provider.set('taxCategory', xubioProvider.categoriaFiscal)
      provider.set('postalCode', xubioProvider.codigoPostal)
      provider.set('purchaseAccount', xubioProvider.cuentaCompra_id)
      provider.set('saleAccount', xubioProvider.cuentaVenta_id)
      provider.set('address', xubioProvider.direccion)
      provider.set('email', xubioProvider.email)
      provider.set('taxType', xubioProvider.identificacionTributaria)
      provider.set('name', xubioProvider.nombre)
      provider.set('observation', xubioProvider.observaciones)
      provider.set('country', xubioProvider.pais ? xubioProvider.pais.ID : null)
      provider.set('province', xubioProvider.provincia ? xubioProvider.provincia.ID : null)
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
      console.error(e)
      throw (e)
    }
  }
}

Parse.Object.registerSubclass('Provider', Provider)

module.exports = {
  Provider
}
