class Budget {
  static castToXubio (literal) {
    const xubioBudget = { }

    xubioBudget.descripcion = literal.description // 'Envío: ' + id
    xubioBudget.fecha = literal.date // date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    xubioBudget.fechaVto = literal.date // expirationDate.getFullYear() + '-' + ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' + ('0' + expirationDate.getDate()).slice(-2)
    xubioBudget.moneda = { 'ID': -3, 'codigo': 'DOLARES', 'nombre': 'Dólares' }
    xubioBudget.probabilidad = 1
    xubioBudget.cotizacion = Number(literal.dollarValue)
    xubioBudget.cliente = {
      'ID': literal.clientId,
      'nombre': literal.client
      // 'codigo': literal.provider
    }
    xubioBudget.transaccionProductoItems = [ ]

    for (const product of literal.items) {
      const productItem = { }
      const netPrice = product.value
      const taxes = product.value * (Number(product.vat) / 100)
      const grossPrice = netPrice - taxes
      productItem.importe = grossPrice
      // montoExtento?
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
    return xubioBudget
  }
}

module.exports = {
  Budget
}
