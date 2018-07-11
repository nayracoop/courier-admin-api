let provider = require('./provider');
let ups = require('./ups');

Parse.Cloud.define('ProviderSync', provider.providerSync);
Parse.Cloud.define('UpsLabelRecovery', ups.labelRecovery);
