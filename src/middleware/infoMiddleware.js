/**
 * Defines an express middleware to generate a system and service config page
 */
const express = require('express')
const os = require('os')

module.exports = (config) => {
  // Sanity checks...
  if (!config) throw new Error("config required")
  if (!config.identity) throw new Error("config.identity required")

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

  return (req) => res.json(buildInfoResponse())
}
