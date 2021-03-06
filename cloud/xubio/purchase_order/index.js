var xubioService = require('../../../operations/xubio')

module.exports = {
  createPurchaseOrder: async (req, res) => {
    // get xubio token. xubio.service
    let shippingId = req.params.shippingId
    let items = req.params.items
    try {
      const token = await xubioService.getToken()
      for (const item of items) {
        try {
          const purchaseOrder = await xubioService.postPurchaseOrder(token, createItem(item, shippingId))
          res.success(purchaseOrder)
        } catch (e) {
          console.error(e.code, e.message)
          res.error(e)
        }
      }
    } catch (e) {
      console.error(e.code, e.message)
      res.error(e)
    }
  }
}

function createItem (item, id) {
  let xubioPurchaseOrder = { }
  // let date = new Date()
  // let expirationDate = new Date(date + (1000 * 60 * 60 * 27 * 30))

  xubioPurchaseOrder.descripcion = item.description // 'Envío: ' + id
  xubioPurchaseOrder.fecha = item.date // date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
  xubioPurchaseOrder.fechaVto = item.date // expirationDate.getFullYear() + '-' + ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' + ('0' + expirationDate.getDate()).slice(-2)
  xubioPurchaseOrder.moneda = { 'ID': -3, 'codigo': 'DOLARES', 'nombre': 'Dólares' }
  xubioPurchaseOrder.probabilidad = 1

  xubioPurchaseOrder.cotizacion = Number(item.dollarValue)
  xubioPurchaseOrder.proveedor = {
    'ID': item.providerId,
    'nombre': item.provider
    // 'codigo': item.provider
  }
  xubioPurchaseOrder.transaccionProductoItems = [ ]
  for (const product of item.products) {
    let productItem = { }
    let netPrice = product.value
    let taxes = product.value * (Number(product.vat) / 100)
    let grossPrice = netPrice - taxes
    productItem.importe = grossPrice
    productItem.montoExtento = 0
    productItem.precioconivaincluido = 0
    productItem.porcentajeDescuento = 0
    productItem.cantidad = 1
    productItem.iva = (taxes === 0) ? 0.001 : taxes
    productItem.precio = grossPrice
    productItem.producto = {
      'ID': product.id,
      'codigo': product.code,
      'nombre': product.name
    }
    productItem.total = netPrice
    xubioPurchaseOrder.transaccionProductoItems.push(productItem)
  }
  return xubioPurchaseOrder
}
