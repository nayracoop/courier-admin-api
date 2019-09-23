const countries = require('../common/countries.min.json')
const argProvinces = require('../common/arg_provinces.json')

const accentMap = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }

const accentFold = function (s) {
  if (!s) return ''
  let ret = ''
  for (let i = 0; i < s.length; i++) {
    ret += accentMap[s.charAt(i)] || s.charAt(i)
  }
  return ret
}

const getCountryByName = function (name) {
  return countries.find(country => accentFold(country.name.toLowerCase()) === accentFold(name.toLowerCase()))
}

const getArgProvinceByName = function (name) {
  return argProvinces.find(province => accentFold(province.provincia_nombre.toLowerCase()) === accentFold(name.toLowerCase()))
}

const getCountryByNumericCode = function (numericCode) {
  return countries.find(country => country.numericCode === numericCode)
}

const getArgProvinceById = function (id) {
  return argProvinces.find(province => province.provincia_id === id)
}

module.exports = {
  accentFold,
  getCountryByName,
  getArgProvinceByName,
  getCountryByNumericCode,
  getArgProvinceById
}
