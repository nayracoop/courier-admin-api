var xubioService = require('../../operations/xubio')

module.exports = {
  getProducts: async (req, res) => {
    // get xubio token. xubio.service
    try {
      const token = await xubioService.credential.getToken()
      const products = await xubioService.products.getAll(token.token_type, token.access_token)
      const productList = castProducts(products)
      res.success(productList)
    } catch (e) {
      console.error(e)
      res.error(e)
    }
  }
}

function castProducts (products) {
  let list = []
  for (const item of products) {
    let product = {}
    product.externalId = item.productoid
    product.name = item.nombre
    product.code = item.codigo

    list.push(product)
  }
  return list
}
