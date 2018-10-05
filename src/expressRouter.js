/**
 * This files defines our express routing
 */
 const express = require('express')
 const pretty = require('express-prettify');
 const accessLogMiddleware = require('./middleware/accessLogMiddleware')
 const hitCountMiddleware = require('./middleware/hitCountMiddleware')
 const crashMiddleware = require('./middleware/crashMiddleware')
 const statusMiddleware = require('./middleware/statusMiddleware')
 const internalServiceMiddleware = require('./middleware/internalServiceMiddleware')
 const infoMiddleware = require('./middleware/infoMiddleware')

module.exports.applyMiddleware = function(config, app) {
  // Sanity checks...
  if (!config) throw new Error("config required")

  app = app || express()
  const hitCounter = hitCountMiddleware(config)

  app.use(accessLogMiddleware(config)) // Log request
  app.use(hitCounter) // Count site hits
  app.use(crashMiddleware(config)) // Process fail and crash parameters
  app.use(pretty({ query: 'pretty' })); // Allow for pretty printing

  app.get("/", internalServiceMiddleware({identity: config.identity, hitCounter: hitCounter})) // Process home URL
  app.use("/status", statusMiddleware(config)) // Process status URLs
  app.get("/info", infoMiddleware(config)) // Process info URL

  // Use stock error handler...

  return app
}
