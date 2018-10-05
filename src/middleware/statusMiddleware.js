/**
 * Defines an express middleware to manage our status page and the
 * child pages to set the state
 */
const express = require('express')
const os = require('os')

module.exports = (config) => {
  // Sanity checks...
  if (!config) throw new Error("config required")
  if (!config.identity) throw new Error("config.identity required")

  var isHealthy = !!(config.initialIsHealthy || true)

  function buildStatusResponse() {
    return {
      identity: config.identity,
      isHealthy: isHealthy
    }
  }

  function setStatusMiddleware(newIsHealthy, req, res) {
    const rv = {
      identity: config.identity,
      oldIsHealthy: isHealthy,
      newIsHealthy: newIsHealthy
    }
    console.log(`${config.identity} Status Update - ${JSON.stringify(rv)}`)

    isHealthy = newIsHealthy

    res.json(rv)
  }

  statusRouter = express.Router()
  statusRouter.get('/', (req, res) => res.status(isHealthy ? 200 : 503).json(buildStatusResponse()))
  statusRouter.get('/setHealthy', setStatusMiddleware.bind(this, true))
  statusRouter.get('/setUnhealthy', setStatusMiddleware.bind(this, false))

  return statusRouter
}
