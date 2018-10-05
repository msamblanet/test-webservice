// Loads settings from ./.env and places them in the environment
// Must be as early as possible in application...
require('dotenv').config()

const config = require('./src/config')
const expressRouter = require('./src/expressRouter')

// Generate and apply routing to Express...
app = expressRouter.applyMiddleware(config)

// Start listening...
app.listen(config.port, () => console.log(`${config.identity} - ${config.serviceName} listening on port ${config.port}`))
