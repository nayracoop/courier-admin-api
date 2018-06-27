 var Provider = Parse.Object.extend("Provider", {
    // Instance properties go in an initialize method
    initialize: (attrs, options) => {
    },
    exists: () => {
    }
}, {
    // Class methods
    createFromXubio: function (xubioProvider) {
        var provider = new Provider();
        provider.set("vatId", provider.CUIT);
        provider.set("taxCategory", provider.categoriaFiscal);
        provider.set("postalCode", provider.codigoPostal);
        provider.set("purchaseAccount", provider.cuentaCompra_id);
        provider.set("saleAccount", provider.cuentaVenta_id);
        provider.set("address", provider.direccion);
        provider.set("email", provider.email);
        provider.set("taxType", provider.identificacionTributaria);
        provider.set("name", provider.nombre);
        provider.set("observation", provider.observaciones);
        provider.set("country", provider.pais);
        provider.set("externalId", provider.proveedorId);
        provider.set("province", provider.provincia);
        provider.set("businessName", provider.razonSocial);
        provider.set("phone", provider.telefono);
        provider.set("userCode", provider.usrCode);
        
        return provider;
    }
});

module.exports = Provider;
