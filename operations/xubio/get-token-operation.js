const rp = require('request-promise')

// returns a Xubio token which is valid for a determined period of time.
// uses API_URI, CLIENT_ID and SECRET stored in .env file
const getToken = async () => {
  const xubioApiTokenEndpoint = process.env.XUBIO_API_URI + 'TokenEndpoint'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const dataString = 'grant_type=client_credentials'
  const options = {
    url: xubioApiTokenEndpoint,
    method: 'POST',
    headers,
    body: dataString,
    auth: {
      'user': process.env.XUBIO_CLIENT_ID,
      'pass': process.env.XUBIO_SECRET
    },
    json: true
  }
  const token = await rp(options)
  return token
}

module.exports = {
  getToken
}
