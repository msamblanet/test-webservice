/**
 * Defines an express middleware to process the fail and crash query parameters
 */
module.exports = (config) => {
  // Sanity checks...
  if (!config) throw new Error("config required")
  if (!config.identity) throw new Error("config.identity required")

  const crashExitCode = config.crashExitCode || 200
  const onCrash = config.onCrash || (() => process.exit(crashExitCode))

  return (req, res, next) => {
    if (typeof req.query['fail'] !== 'undefined') {
      console.log(`${config.identity} - Failing request as requested by query parameter`)
      throw new Error("Failing request per FAIL parameter")
    }
    else if (typeof req.query['crash'] !== 'undefined') {
      console.log(`${config.identity} - Crashing server as requested by query parameter`)
      onCrash()
    }
    else next()
  }
}
