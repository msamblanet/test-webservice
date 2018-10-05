/**
 * Defines an express middleware to manage our fake status page and the
 * child pages to set the state
 */
const hitCountMiddleware = require('./hitCountMiddleware')
const config = require('../config')

const serviceStartTime = new Date().getTime()

// Shared method for a common HTTP JSON response...
function buildStockResponseObject(req) {
  now = new Date()
  return {
    identity: config.identity,
    req: {
      protocol: req.protocol,
      url: req.originalUrl,
      method: req.method,
      query: req.query,
      headers: req.headers
    },
    now: now.toISOString(),
    serviceUptimeHours: (now.getTime() - serviceStartTime) / 1000 / 60 / 60,
    hits: hitCountMiddleware.getHitCount()
  }
}

module.exports.middleware = (req, res) => res.json(buildStockResponseObject(req))
