# Arcticles CRUD

This is CRUD for articles with auth , pagination, and e2e tests

## Technologies
In CRUD used:
- **ExpresJS** - for api
- **MongoDB** - as db
- **SuperTest** - for e2e testing
- **Yarn** - as package manager
- **Docker** - for containerization

## Architecture
Implemented 3-layered architecture.
Package manager is **Yarn**

## Launch
For launch you need:
1. **.env** - file with variables
2. **MongoDB server**
3. **Install all dependencies** (`yarn install`)

If you launchong via Docker you need:
1. **Docker**
2. **.env** - file with variables

## Testing
For launch e2e-test enter : `yarn run test:e2e`