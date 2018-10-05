/**
 * Unit test to ensure configuration is loaded correctly
 */
const mockRequire = require('mock-require');
const expect = require('chai').expect

/**
 * Defines an express middleware to count all requests against the middleware
 */

var serviceHitCount = 0
module.exports.getHitCount = () => serviceHitCount
module.exports.middleware = (req, res, next) => {
  serviceHitCount++
  next()
}

describe('hitCountMiddlewareTest', () => {
  after(() => mockRequire.reRequire('../../src/middleware/hitCountMiddleware')) // Ensure we load fresh

  describe('Defaults', () => {
    var config
    before(() => middleware = mockRequire.reRequire('../../src/middleware/hitCountMiddleware'))
    it('should have default count of zero', () => expect(middleware.getHitCount()).to.equals(0))
  })
})
