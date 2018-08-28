let client = require('./client');
let provider = require('./provider');
let ups = require('./ups');

Parse.Cloud.define('ClientSync', client.clientSync);
Parse.Cloud.define('ProviderSync', provider.providerSync);
Parse.Cloud.define('UpsLabelRecovery', ups.labelRecovery);
