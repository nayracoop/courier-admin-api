const { getToken, getProducts } = require('../../../operations/xubio')
const { Product } = require('../../../models/product')

const fetchProducts = async (req, res) => {
  try {
    const token = await getToken()
    const xubioProducts = await getProducts(token)
    const products = xubioProducts.map(Product.castFromXubio)
    res.success(products)
  } catch (error) {
    return res.error(4000, {
      message: 'Se produjo un error obteniendo los productos',
      internalMessage: error.message
    })
  }
}

module.exports = {
  fetchProducts
}
