var upsService = require('../../services/ups')

module.exports = {
  labelRecovery: (req, res) => {
    // console.log(upsService);
    upsService()
      .then(response => {
        console.log(response)
        console.log('success')
        // console.log(response.Fault.detail.Errors);
      })
      .catch(error => {
        console.log(error)
        console.log('error')
      })
  }
}
