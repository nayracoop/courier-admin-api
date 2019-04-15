var xubioService = require('../../operations/xubio')

module.exports = {
  createBudget: async (req, res) => {
    // get xubio token. xubio.service
    let shippingId = req.params.shippingId
    let items = req.params.items
    try {
      const token = await xubioService.credential.getToken()
      // try {
      const budget = await xubioService.budget.create(token.token_type, token.access_token, createBudget(items, shippingId))
      res.success(budget)
      // } catch (e) {
      // console.error(e)
      // res.error(e)
      // }
    } catch (e) {
      // console.error(e)
      res.error(e)
    }
  }
}

function createBudget (data, id) {
  let xubioBudget = { }
  // let date = new Date()
  // let expirationDate = new Date(date + (1000 * 60 * 60 * 27 * 30))

  // console.log(data.description)
  xubioBudget.descripcion = data.description // 'Envío: ' + id
  xubioBudget.fecha = data.date // date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
  xubioBudget.fechaVto = data.date // expirationDate.getFullYear() + '-' + ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' + ('0' + expirationDate.getDate()).slice(-2)
  xubioBudget.moneda = { 'ID': -3, 'codigo': 'DOLARES', 'nombre': 'Dólares' }
  xubioBudget.probabilidad = 1
  xubioBudget.cotizacion = Number(data.dollarValue)
  xubioBudget.cliente = {
    'ID': data.clientId,
    'nombre': data.client
    // 'codigo': data.provider
  }
  xubioBudget.transaccionProductoItems = [ ]

  for (const product of data.items) {
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
    xubioBudget.transaccionProductoItems.push(productItem)
  }
  console.log(JSON.stringify(xubioBudget))
  return xubioBudget
}
