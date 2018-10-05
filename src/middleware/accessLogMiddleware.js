/**
 * Defines a method to construct the access logger middleware for Express
 * using morgan and rotating-file-stream
 */
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')

modules.exports = (config) => {
  // Sanity checks...
  if (!config) throw new Error("config required")
  if (!config.accessLogRotation) throw new Error("config.accessLogRotation required")
  if (!config.accessLogPath) throw new Error("config.accessLogPath required")
  if (!config.identity) throw new Error("config.identity required")

  const logFormat ='combined'
  const rfsFilename = 'access.log'
  const rfsConfig = {
    interval: config.accessLogRotation,
    path: config.accessLogPath,
    compress: true,
    initialRotation: true,
    maxFiles: 30
  }

  // Create directory if needed...
  fs.existsSync(rfsConfig.path) || fs.mkdirSync(rfsConfig.path)

  // Create access log stream...
  const rfsStream = rfs(rfsFilename, rfsConfig)

  // Log info
  console.log(`${config.identity} Writing access logs to: ${path.resolve(rfsStream.name)}`)

  return module.exports.middleware = morgan(logFormat, { stream: rfsStream })
}
