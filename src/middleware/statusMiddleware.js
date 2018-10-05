/**
 * Defines an express middleware to manage our status page and the
 * child pages to set the state
 */
const express = require('express')
const os = require('os')
const config = require('../config')

var serviceStatus = "good"

function buildStatusResponse() {
  return {
    identity: config.identity,
    serviceStatus: serviceStatus
  }
}

function statusMiddleware(req, res) {
  res.status((serviceStatus === "good" ? 200 : 503)).json(buildStatusResponse(serviceStatus))
}

function setStatusMiddleware(newStatus, req, res) {
  if (newStatus === serviceStatus) {
    msg = `${config.identity} - Stage unchanged: ${serviceStatus}`
  } else {
    serviceStatus = newStatus
    msg = `${config.identity} - Stage changed: ${serviceStatus}`
  }
  console.log(msg)
  res.send(msg)
}

statusRouter = express.Router()
statusRouter.get('/', statusMiddleware)
statusRouter.get('/setGood', setStatusMiddleware.bind(this, "good"))
statusRouter.get('/setBad', setStatusMiddleware.bind(this, "bad"))

module.exports.middleware = statusRouter
