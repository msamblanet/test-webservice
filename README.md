# Overview
This is a basic web service for testing deployment techniques and environments.
It provides capabilities to:
- Expose environment settings (environment variables, network/disk info, etc)
- Test basic web connectivity, port mapping, load balancing
- Test service-to-service connectivity
- Test storage (local and shared, persistent and ephemeral)
- Test behavior during health failures
- Test handling of console and file-based logs

# Usage
```
npm install && npm test && npm start
```

# Endpoints
| Path | Description |
| --- | --- |
| `/` | Responds with general info about the request and service as json |
| `/status` | Responds with status JSON<br>Status defaults healthy but can be set with other endpoints<br>If healthy, `HTTP 200` is used<br>If unhealthy, `HTTP 503` is used |
| `/status/setHealthy` | Sets the health to healthy |
| `/status/setUnhealthy` | Sets the health to unhealthy |
| `/info` | Responds with JSON describing system and service configuration |
| Default | Responds with the default express `HTTP 404` page |

# Query Parameters for all pages
| Parameters | Description |
| --- | --- |
| `pretty` | Pretty response (if JSON) |
| `fail` | Force the request to generate an HTTP 500 |
| `crash` | Simulates a server crash via process.exit() |

# Configuration Settings
| Setting | Description | Default |
| --- | --- | --- |
| `PORT` |  HTTP port to listen on | `3000` |
| `ACCESS_LOG_PATH` |  Path for access logs | `./logs` |
| `ACCESS_LOG_ROTATION` |  How frequently to rotate logs<br>See [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream) | `1d` |
| `SERVICENAME` |  Name of the service | `test-webservice` |
| `IDENTITY` |  String appended to all logs to identify<br> the instance of the service | Generated from<br>servicename and hostname |
| `FAIL_UNIT_TESTS` | If set, unit tests will fail.<br>NOTE: This **CANNOT** be set via a .env file |

Unless otherwise noted, settings may be set via the environment OR via a .env file.

# Logging
- Diagnostic logs are written to console.  No log level control is provided.
- Access logs are written to the folder configured and rotated per configuration

# NPM Scripts
| Command | Description |
| --- | --- |
| `npm test` | Runs unit tests |
| `npm start` | Starts the service |
| `npm run make-docker` | Builds a local docker image tagged msamblanet/test-webservice:latest |

# Runtime Dependencies
| Runtime Dependency | Purpose |
| --- | --- |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads configurations from .env files |
| [express](http://expressjs.com/) | HTTP routing and workflow |
| [express-prettify](https://www.npmjs.com/package/express-prettify) | JSON pretty printer for express |
| [morgan](https://github.com/expressjs/morgan) | HTTP logging |
| [rotating-file-stream](https://www.npmjs.com/package/rotating-file-stream) | File rotator used for access logs |

## Dev Dependencies
| Dev Dependency | Purpose |
| --- | --- |
| [mocha](https://mochajs.org/) | Unit test framework |
| [chai](https://www.chaijs.com/) | Assertion framework for unit tests |
| [chai-as-promised](https://github.com/domenic/chai-as-promised) | Chai promise extensions |
| [sinon](https://sinonjs.org/) | Mocking library |
| [nock](https://github.com/nock/nock) | HTTP mocking library |
| [mock-require](https://github.com/boblauer/mock-require) | require() mocking and cache-busting |
| [istanbul](https://istanbul.js.org/) | Code coverage |
| [nyc](https://github.com/istanbuljs/nyc) | CLI for unit testing and coverage |
| [cross-var](https://www.npmjs.com/package/cross-var) | Enables cross-platform variable expansion in npm scripts |

Suggested reading on node test tools: <https://hackernoon.com/testing-node-js-in-2018-10a04dd77391>

# High-Level Tour of the Files
- [server.js](server.js) - The main server entry point (used by ```npm start```)
- [src/](src) - Project source code
  - [config.js](src/config.js) - Pulls all configuration out of the environment into an easier-to-use object
  - [expressRouter.js](src/expressRouter.js) - Initializes the express engine with all of the middleware and routers
  - [middleware/](src/middleware) - Custom middleware implementations for express
- [test/](test) - Unit test code

# Output Folders
| Folder | Description |
| --- | --- |
| `.nyc_output` | Raw output from nyc's unit test runs |
| `coverage` | Code coverage reports from unit tests<br>See index.html in this folder for reports |
| `logs` | Access logs (if using default settings) |
