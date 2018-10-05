/**
 * Defines an express middleware to manage our status page and the
 * child pages to set the state
 */
const express = require('express')
const os = require('os')
const config = require('../config')

function buildInfoResponse() {
  return {
    identity: config.identity,
    config: config,
    env: process.env,
    host: {
      hostname: os.uptime(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
      networkInterfaces: os.networkInterfaces()
    }
  }
}

module.exports.middleware = (req) => res.json(buildInfoResponse())
