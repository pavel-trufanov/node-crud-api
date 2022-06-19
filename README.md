# node-crud-api

Run in dev mode
`npm run start:dev`

Build and run in prod mode
`npm run start:prod`

Minified app file is located in ./dist/main.cjs

Run tests
`npm run test`

I specified a separate http port = 8001 for test server, so it should be fine to run tests even if dev server is running

Note:
HTTP PUT method implemented in a way that I'm updating only fields that are passed in JSON file.
I do not consider it as a validation error if some fields are missing during user update.

