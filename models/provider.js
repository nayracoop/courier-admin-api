const commonFunctions = require('../common/functions')

class Provider extends Parse.Object {
  constructor () {
    super('Provider')
  }

  castToXubio () {
    const xubioProvider = {}
    const address = this.get('address')

    const province = address && address.province ? commonFunctions.getArgProvinceById(address.province) : null
    const country = address && address.country ? commonFunctions.getCountryByNumericCode(address.country) : null
    const docType = this.get('docType')

    xubioProvider.nombre = this.get('name')
    xubioProvider.identificacionTributaria = {
      ID: docType === 9 ? docType : 44
    }
    xubioProvider.categoriaFiscal = {
      ID: this.get('taxCategory')
    }
    xubioProvider.provincia = {
      nombre: province ? province.provincia_nombre : ''
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
      nombre: country ? country.name : ''
    }
    xubioProvider.usrCode = this.get('userCode')
    xubioProvider.observaciones = this.get('observation')
    if (docType === 9) {
      xubioProvider.CUIT = this.get('docValue')
    }

    return xubioProvider
  }

  static async createFromXubio (xubioProvider) {
    const provider = new Provider()

    const province = xubioProvider && xubioProvider.provincia ? commonFunctions.getArgProvinceByName(xubioProvider.provincia.nombre) : null
    const country = xubioProvider && xubioProvider.pais ? commonFunctions.getCountryByName(xubioProvider.pais.nombre) : null

    try {
      provider.set('externalId', xubioProvider.proveedorid)
      if (xubioProvider && xubioProvider.CUIT) {
        provider.set('docValue', xubioProvider.CUIT)
      }
      provider.set('taxCategory', xubioProvider.categoriaFiscal && xubioProvider.categoriaFiscal.ID)
      provider.set('purchaseAccount', xubioProvider.cuentaCompra_id && xubioProvider.cuentaCompra_id.ID)
      provider.set('saleAccount', xubioProvider.cuentaVenta_id && xubioProvider.cuentaVenta_id.ID)
      provider.set('email', xubioProvider.email)
      if (xubioProvider && xubioProvider.identificacionTributaria) {
        provider.set('docType', xubioProvider.identificacionTributaria.ID)
      }
      provider.set('name', xubioProvider.nombre)

      provider.set('address', {
        streetAddress: xubioProvider.direccion,
        postalCode: xubioProvider.codigoPostal,
        province: province ? province.provincia_id : '',
        country: country ? country.numericCode : ''
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
