module.exports = {
  accent_fold: function (s) {
    if (!s) return ''
    let ret = ''
    for (let i = 0; i < s.length; i++) {
      ret += accentMap[s.charAt(i)] || s.charAt(i)
    }
    return ret
  }
}

var accentMap = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' }
