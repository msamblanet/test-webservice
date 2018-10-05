/**
 * Defines an express middleware to count all requests against the middleware
 */

var serviceHitCount = 0
module.exports.getHitCount = () => serviceHitCount
module.exports.middleware = (req, res, next) => {
  serviceHitCount++
  next()
}
