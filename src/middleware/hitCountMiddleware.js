/**
 * Defines an express middleware to count all requests against the middleware
 */
module.exports = function(config) {
  var serviceHitCount = config.initialHitCount || 0

  const rv = (req, res, next) => {
    serviceHitCount++
    next()
  }

  rv.getHitCount = () => serviceHitCount

  return rv
}
