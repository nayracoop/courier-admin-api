var rp = require('request-promise');

module.exports = {
    getById: function (clientId, tokenType, accessToken) {
        let xubioApi_clientEndpoint = process.env.XUBIO_API_URI + 'clienteBean/' + clientId;
        let headers = {
            'Authorization': tokenType + ' ' + accessToken
        };
        let options = {
            url: xubioApi_clientEndpoint,
            method: 'GET',
            headers: headers,
            json: true
        };
        return rp(options);
    },

    getAll: function (tokenType, accessToken) {
        let xubioApi_clientEndpoint = process.env.XUBIO_API_URI + 'clienteBean';
        let headers = {
            'Authorization': tokenType + ' ' + accessToken
        };
        let options = {
            url: xubioApi_clientEndpoint,
            method: 'GET',
            headers: headers,
            json: true
        };
        return rp(options);
    }
}
