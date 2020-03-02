# Courier Admin API (built on top of Parse Server)

Docker based Parse Server + Parse Dashboard with cloud functions added.

## Features

### Syncronization with Xubio

[Xubio](https://xubio.com/) is an online commercial management tool.
New records created for Clients and Providers are auotomatically syncronized with Xubio. Creation of budgets and purchase orders are also supported.

Configuration:

- You'd need a [PLUS or + subscription](https://xubio.com/ar/precios) to use Xubio's API.
- Once there, get your API keys from the [integrations page](https://xubio.com/NXV/configuracion/integraciones/api-de-xubio)
- **`Client_id`** and **`Secret_id`** are to be used on their corresponding **`.env`** keys. Check [.env-example](.env-example) for an **`.env`** base.

## License

<img src="https://img.shields.io/badge/license-GPL--3-brightgreen" alt="license GNU General Public License v3.0"> GNU General Public License v3.0
