class Product {
  static castFromXubio (xubioProducts) {
    const products = []
    for (const xubioProduct of xubioProducts) {
      const product = {}
      product.externalId = xubioProduct.productoid
      product.name = xubioProduct.nombre
      product.code = xubioProduct.codigo

      products.push(product)
    }
    return products
  }
}

module.exports = {
  Product
}
