var rp = require('request-promise');

module.exports = function getToken() {
    let xubioApi_tokenEndpoint = process.env.XUBIO_API_URI + 'TokenEndpoint';
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    let dataString = 'grant_type=client_credentials';
    let options = {
        url: xubioApi_tokenEndpoint,
        method: 'POST',
        headers: headers,
        body: dataString,
        auth: {
            'user': process.env.XUBIO_CLIENT_ID,
            'pass': process.env.XUBIO_SECRET
        },
        json: true
    };
    return rp(options);
}
