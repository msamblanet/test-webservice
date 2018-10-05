/**
 *  Defines configuration constants for this serice...
 */
const os = require('os')

var serviceName = process.env.SERVICENAME || "test-webservice"
module.exports = {
  port: parseInt(process.env.PORT || 3000),
  accessLogPath: process.env.ACCESS_LOG_PATH || "./logs",
  accessLogRotation: process.env.ACCESS_LOG_ROTATION || "1d",
  serviceName: serviceName,
  identity: process.env.IDENTITY || `[${serviceName} ${os.hostname()}]`
}
