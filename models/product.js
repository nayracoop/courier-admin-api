class Product {
  static castFromXubio (xubioProduct) {
    const product = {}

    product.externalId = xubioProduct.productoid
    product.name = xubioProduct.nombre
    product.code = xubioProduct.codigo

    return product
  }
}

module.exports = {
  Product
}
