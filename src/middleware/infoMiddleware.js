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
      host: {
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        uptimeHours: os.uptime()/60.0/60.0, // Hours
        loadavg: os.loadavg(),
        totalmemGB: os.totalmem()/1024.0/1024.0/1024.0, // GB
        freememGB: os.freemem()/1024.0/1024.0/1024.0, // GB
        cpus: os.cpus(),
        networkInterfaces: os.networkInterfaces()
      },
      env: process.env
    }
  }

  return (req, res, next) => res.json(buildInfoResponse())
}
