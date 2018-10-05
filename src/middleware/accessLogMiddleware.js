/**
 * Defines a method to construct the access logger middleware for Express
 * using morgan and rotating-file-stream
 */
const morgan = require('morgan')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const config = require('../config')

// Create directory if needed...
fs.existsSync(config.accessLogPath) || fs.mkdirSync(config.accessLogPath)

// Create access log stream...
const accessLogStream = rfs('access.log', {
    interval: config.accessLogRotation,
    path: config.accessLogPath,
    compress: true,
    initialRotation: true,
    maxFiles: 30
})

// Log info
console.log(`${config.identity} Access Log: ${config.accessLogPath}/access.log -- Rotation: ${config.accessLogRotation}`)

module.exports.middleware = morgan('combined', { stream: accessLogStream })
