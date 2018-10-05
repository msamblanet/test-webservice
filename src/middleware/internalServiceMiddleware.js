/**
 * Defines an express middleware to generate the main JSON application response
 */
module.exports = (config) => {
  // Sanity checks...
  if (!config) throw new Error("config required")
  if (!config.identity) throw new Error("config.identity required")
  if (!config.hitCounter) throw new Error("config.hitCounter required")

  const serviceStartTime = config.serviceStartTime || new Date().getTime()

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
      hits: config.hitCounter.getHitCount()
    }
  }

  return (req, res) => res.json(buildStockResponseObject(req))
}
