# An Express-Node-MongoDB API

A simple Express-Node API with a bunch of verbs to the book noun, tests, linting, Mongoose ORM, Docker, Redis Cache

- runs on port 4000
- routes are /api/v1/books
- /api/v1/books/:id

Swagger Docs - some simple swagger documenation

tests are using mocha, sinon, and supertest (integration tests)

to set up sample database, check out DataImportInstructions.txt, will import booksJSON.js

Implements HATEOS with links that help document

Uses docker to provide deployable container - uses local mongo

Uses Redis to cache the gets (gotta add this to docker)

- Create config/default.json using sample_default.json to set config vars