/**
 * This files defines our express routing
 */
 const express = require('express')
 const pretty = require('express-prettify');
 const accessLogMiddleware = require('./middleware/accessLogMiddleware')
 const hitCountMiddleware = require('./middleware/hitCountMiddleware')
 const crashMiddleware = require('./middleware/crashMiddleware')
 const statusMiddleware = require('./middleware/statusMiddleware')
 const helloMiddleware = require('./middleware/helloMiddleware')
 const infoMiddleware = require('./middleware/infoMiddleware')

module.exports.applyMiddleware = function(app) {
  app = app || express()

  app.use(accessLogMiddleware.middleware) // Log request
  app.use(hitCountMiddleware.middleware) // Count site hits
  app.use(crashMiddleware.middleware) // Process fail and crash parameters
  app.use(pretty({ query: 'pretty' })); // Allow for pretty printing

  app.get("/", helloMiddleware.middleware) // Process home URL
  app.use("/status", statusMiddleware.middleware) // Process status URLs
  app.get("/info", infoMiddleware.middleware) // Process info URL

  // Use stock error handler...

  return app
}
