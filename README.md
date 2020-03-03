# Courier Admin API (built on top of Parse Server)

Parse Server with cloud functions. Has Docker support to run it with a containerized Mongo database and Parse Dashboard.

It's ment to be used in conjunction with the [Courier Admin Dashboard](https://github.com/nayracoop/courier-admin-dashboard).

## Configuration

Configuration values, either to run the API with Docker or locally (E.g.: for ease of debug) must be placed in a **`.env`** file. You may use [.env-example](.env-example) as base.

**`.env`** file is used by [dotenv](https://github.com/motdotla/dotenv) module to fill Node environment variables and with placeholders in the [docker-compose.yml](docker-compose.yml) file.

Keys for different ports are included for Mongo, Parse Server and Parse Dashboard to be used on Docker containers. **`*_PORT`** references the port inside the container and **`*_LOCAL_PORT`** on the host machine.

### Syncronization with Xubio

[Xubio](https://xubio.com/) is an online commercial management tool.
New records created for Clients and Providers on the Courier Admin Dashboard are automatically syncronized with Xubio, by using [Parse Server's Cloud Functions](https://docs.parseplatform.org/cloudcode/guide/#cloud-functions). Creation of budgets and purchase orders are also supported using Cloud Functions, stored in the [cloud](/cloud) folder

To configure it:

- You'd need a [PLUS or + subscription](https://xubio.com/ar/precios) to use Xubio's API.
- Once there, get your API keys from the [integrations page](https://xubio.com/NXV/configuracion/integraciones/api-de-xubio)
- **`Client_id`** and **`Secret_id`** are to be used on their corresponding **`.env`** keys: **`XUBIO_CLIENT_ID`** and **`XUBIO_SECRET`** respectivelly. Check [.env-example](.env-example) for an **`.env`** base.

### Parse Server

The API is built on top of [Parse Server](https://parseplatform.org/). You may find example configuration values for your **`.env`** file as **`PARSE_SERVER_*`** keys in the [.env-example](.env-example).

### Parse Dashboard

**`docker-compose.yml`** includes a [Parse Dashboard](https://hub.docker.com/r/parseplatform/parse-dashboard) entry. You may find example configuration values for your **`.env`** file as **`PARSE_DASHBOARD_*`** keys in the [.env-example](.env-example).

Values from **`PARSE_USER1`** and **`PARSE_USER1_PASSWORD`** from your **`.env`** file, are used to create user and password respectivelly to access Parse Dashboard.

### Mongo DB

Database is configured using **`MONGODB_URI`** key and **`DB_*`** keys. Please check [.env-example](.env-example) for examples.

### UPS

Communication with UPS was planified but not implemented and it's not in our immediate plans to continue with it. **`UPS_`** keys for that integration still remain in the [.env-example](.env-example).

## Development

### Install

- Clone and run **`npm install`**
- Clone, configure and run the [Courier Admin Dashboard](https://github.com/nayracoop/courier-admin-dashboard.git) to have a working client for the API.

### Use

- In the configuration entry above you'll find details on how to complete your **`.env`** file.
- Serve with [nodemon](https://nodemon.io/) using **`npm run dev`** :zap:

### Database migrations

- Migrations can be placed in [/tasks/migrations](/tasks/migrations) folder. To run them using [Jake](https://jakejs.com/) (and to run the initial migration, which works as example/template, and creates users), you may run **`npm run migrations`** :zap:

### Use with Docker Compose

- If you've got Docker and the docker-compose CLI installed, you may run **`docker-compose up`** to get a working API, Parse Server, Parse Dashboard and Mongo DB running. For more details check the [docker-compose.yml](docker-compose.yml) file and the [docker-compose documentation](https://docs.docker.com/compose/reference/up/).

## License

<img src="https://img.shields.io/badge/license-GPL--3-brightgreen" alt="license GNU General Public License v3.0"> GNU General Public License v3.0
