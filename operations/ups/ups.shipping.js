var rp = require('request-promise')

module.exports = function labelRecovery () {
  let upsApiEndpoint = process.env.UPS_LABEL_RECOVERY_URI
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  }
  let dataString = {
    'UPSSecurity': {
      'UsernameToken': {
        'Username': process.env.UPS_USERNAME,
        'Password': process.env.UPS_PASSWORD
      },
      'ServiceAccessToken': {
        'AccessLicenseNumber': process.env.UPS_ACCESS_KEY
      }
    },
    'LabelRecoveryRequest': {
      'LabelSpecification': {
        'LabelImageFormat': {
          'Code': 'GIF'
        },
        'HTTPUserAgent': 'Mozilla/4.5'
      },
      'Translate': {
        'LanguageCode': 'eng',
        'DialectCode': 'GB',
        'Code': '01'
      },
      'TrackingNumber': '1Z12345E8791315509'
    }
  }
  let options = {
    url: upsApiEndpoint,
    method: 'POST',
    headers: headers,
    body: dataString,
    json: true
  }
  return rp(options)
}

module.exports = function createShipping () {
  let upsApiEndpoint = process.env.UPS_SHIPPING_URL
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Origin': '*'
  }
  let dataString = {
    'UPSSecurity': {
      'UsernameToken': {
        'Username': process.env.UPS_USERNAME,
        'Password': process.env.UPS_PASSWORD
      },
      'ServiceAccessToken': {
        'AccessLicenseNumber': process.env.UPS_ACCESS_KEY
      }
    },
    'ShipmentRequest': {
      'Request': {
        'RequestOption': 'validate',
        'TransactionReference': {
          'CustomerContext': 'Your Customer Context'
        }
      },
      'Shipment': {
        'Description': 'Description',
        'Shipper': {
          'Name': 'Shipper Name',
          'AttentionName': 'Shipper Attn Name',
          'TaxIdentificationNumber': '123456',
          'Phone': {
            'Number': '1234567890',
            'Extension': '1'
          },
          'ShipperNumber': 'Your Shipper Number',
          'FaxNumber': '1234567890',
          'Address': {
            'AddressLine': 'Address Line',
            'City': 'City',
            'StateProvinceCode': 'StateProvinceCode',
            'PostalCode': 'PostalCode',
            'CountryCode': 'CountryCode'
          }
        },
        'ShipTo': {
          'Name': 'Ship To Name',
          'AttentionName': 'Ship To Attn Name',
          'Phone': {
            'Number': '1234567890'
          },
          'Address': {
            'AddressLine': 'Address Line',
            'City': 'City',
            'StateProvinceCode': 'StateProvinceCode',
            'PostalCode': 'PostalCode',
            'CountryCode': 'CountryCode'
          }
        },
        'ShipFrom': {
          'Name': 'Ship From Name',
          'AttentionName': 'Ship From Attn Name',
          'Phone': {
            'Number': '1234567890'
          },
          'FaxNumber': '1234567890',
          'Address': {
            'AddressLine': 'Address Line',
            'City': 'City',
            'StateProvinceCode': 'StateProvinceCode',
            'PostalCode': 'PostalCode',
            'CountryCode': 'CountryCode'
          }
        },
        'PaymentInformation': {
          'ShipmentCharge': {
            'Type': '01',
            'BillShipper': {
              'AccountNumber': 'Your Account Number'
            }
          }
        },
        'Service': {
          'Code': '01',
          'Description': 'Express'
        },
        'ShipmentRatingOptions': {
          'NegotiatedRatesIndicator': '0'
        },
        'Package': {
          'Description': 'Description',
          'Packaging': {
            'Code': '02',
            'Description': 'Description'
          },
          'Dimensions': {
            'UnitOfMeasurement': {
              'Code': 'IN',
              'Description': 'Inches'
            },
            'Length': '7',
            'Width': '5',
            'Height': '2'
          },
          'PackageWeight': {
            'UnitOfMeasurement': {
              'Code': 'LBS',
              'Description': 'Pounds'
            },
            'Weight': '10'
          }
        }
      },
      'LabelSpecification': {
        'LabelImageFormat': {
          'Code': 'GIF',
          'Description': 'GIF'
        },
        'HTTPUserAgent': 'Mozilla/4.5'
      }
    }
  }
  let options = {
    url: upsApiEndpoint,
    method: 'POST',
    headers: headers,
    body: dataString,
    json: true
  }
  return rp(options)
}
