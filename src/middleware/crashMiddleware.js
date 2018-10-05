/**
 * Defines an express middleware to process the fail and crash query parameters
 */
const config = require('../config')

module.exports.middleware = (req, res, next) => {

  if (typeof req.query['fail'] !== 'undefined') {
    console.log(`${config.identity} - Failing request as requested by query parameter`)
    throw new Error("Failing request per FAIL parameter")
  }

  else if (typeof req.query['crash'] !== 'undefined') {
    console.log(`${config.identity} - Crashing server as requested by query parameter`)
    process.exit(200)
  }

  else next()
}
