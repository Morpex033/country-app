# Country App

## Introduction

This repository contains a backend application for fetching data from external APIs and adding holidays to the user's calendar.

### Requirements

Before running the application, make sure the following software is installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [MongoDB](https://www.mongodb.com/)

### Setup

To set up the application on your local machine, follow these steps:

1. **Clone the Repository:**

   Clone this repository to your local machine using the following command:

   ````
   git clone https://github.com/yourusername/country-app.git
   cd country-app
   ````

2. **Install Dependencies:**

   Install the required dependencies by running:

   ```
   npm install
   ```

### Environment Variables

You need to create a `.env` file in the root of the directory. Here's a table with required variables:

| Variable                 | Description                                   | Default Value                                               |
| ------------------------ | --------------------------------------------- | ----------------------------------------------------------- |
| `HOST`                   | Postgres host.                                | `localhost`                                                 |
| `PORT`                   | Postgres port.                                | `5432`                                                      |
| `DB_NAME`                | The name of the PostgreSQL database.          | `country`                                                   |
| `DB_USERNAME`            | The username for connecting to the database.  | `postgres`                                                  |
| `DB_PASSWORD`            | The password for the database user.           | `N/A`                                                       |
| `COUNTRY_URL`            | URL to fetch the list of available countries. | `https://date.nager.at/api/v3/AvailableCountries`           |
| `COUNTRY_INFO_URL`       | URL to fetch country information.             | `https://date.nager.at/api/v3/CountryInfo`                  |
| `COUNTRY_IMAGES_URL`     | URL to fetch country flag images.             | `https://countriesnow.space/api/v0.1/countries/flag/images` |
| `COUNTRY_POPULATION_URL` | URL to fetch country population information.  | `https://countriesnow.space/api/v0.1/countries/population`  |
| `HOLIDAYS_URL`           | URL to fetch public holidays information.     | `https://date.nager.at/api/v3/PublicHolidays/`              |

Configure these environment variables according to your deployment context and requirements.

### Run Migrations:

You need run the migrations with the following command:

```
npm run typeorm:run-migrations
```

### Scripts

Here are the available npm scripts to build, run, and migrate your application:

| Script                       | Command                                                                                                                          | Description                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Build and Format**         |                                                                                                                                  |                                                                                                                              |
| `build`                      | `nest build`                                                                                                                     | Compiles the TypeScript source code into JavaScript using the NestJS build system.                                           |
| `format`                     | `prettier --write "src/**/*.ts" --log-level warn`                                                                                | Formats the TypeScript code in the `src` directory according to Prettier configuration, logs warnings for formatting issues. |
| **Start**                    |                                                                                                                                  |                                                                                                                              |
| `start`                      | `nest start`                                                                                                                     | Starts the application using the NestJS framework.                                                                           |
| `start:dev`                  | `nest start --watch`                                                                                                             | Starts the application in development mode with hot-reloading enabled.                                                       |
| `start:debug`                | `nest start --debug --watch`                                                                                                     | Starts the application in debug mode, providing additional debug information and hot-reloading.                              |
| `start:prod`                 | `node dist/main`                                                                                                                 | Starts the application in production mode from the compiled JavaScript in the `dist` directory.                              |
| **Database Migrations**      |                                                                                                                                  |                                                                                                                              |
| `typeorm:run-migrations`     | `npm run typeorm migration:run -- -d ./src/infrastructure/db/db.data-source.ts`                                                  | Runs the database migrations based on the configured data source.                                                            |
| `typeorm:generate-migration` | `cross-env npm run typeorm -- -d ./src/infrastructure/db/db.data-source.ts migration:generate ./src/migrations/$npm_config_name` | Generates a new migration file based on the current database state and the provided name.                                    |
| `typeorm:create-migration`   | `cross-env npm run typeorm -- migration:create ./src/migrations/$npm_config_name`                                                | Creates a new blank migration file with the given name.                                                                      |
| `typeorm:revert-migration`   | `npm run typeorm -- -d ./src/infrastructure/db/db.data-source.ts migration:revert`                                               | Reverts the last executed migration using the specified data source configuration.                                           |
