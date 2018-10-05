/**
 * Unit test to ensure configuration is loaded correctly
 */
const mockRequire = require('mock-require');
const expect = require('chai').expect

describe('Configuration', () => {
  before(() => require('os').hostname = () => "TESTHOSTNAME") // Mock out hostname for all tests
  after(() => {
    mockRequire.reRequire("os") // Force reload once we are done
    mockRequire.reRequire('../src/config') // Force reload once we are done
  })

  describe('Defaults', () => {
    var config
    before(() => config = mockRequire.reRequire('../src/config'))

    it('should have default port', () => expect(config).to.have.property("port").that.equals(3000))
    it('should have default accessLogPath', () => expect(config).to.have.property("accessLogPath").that.equals("./logs"))
    it('should have default accessLogRotation', () => expect(config).to.have.property("accessLogRotation").that.equals("1d"))
    it('should have default serviceName', () => expect(config).to.have.property("serviceName").that.equals("test-webservice"))
    it('should have overridden identity', () => expect(config).to.have.property("identity").that.equals("[test-webservice TESTHOSTNAME]"))
  })

  describe('Env', () => {
    var config
    before(() => {
      process.env.PORT = "3001"
      process.env.ACCESS_LOG_PATH = "./TEST_LOGS"
      process.env.ACCESS_LOG_ROTATION = "2d"
      process.env.SERVICENAME = "UNITTESTSVCNAME"
      process.env.IDENTITY = "UNITTESTIDENTITY"
      config = mockRequire.reRequire('../src/config')
    })
    after(() => {
      delete process.env.PORT
      delete process.env.ACCESS_LOG_PATH
      delete process.env.ACCESS_LOG_ROTATION
      delete process.env.SERVICENAME
      delete process.env.IDENTITY
    })

    it('should have overridden port', () => expect(config).to.have.property("port").that.equals(3001))
    it('should have overridden accessLogPath', () => expect(config).to.have.property("accessLogPath").that.equals("./TEST_LOGS"))
    it('should have overridden accessLogRotation', () => expect(config).to.have.property("accessLogRotation").that.equals("2d"))
    it('should have overridden serviceName', () => expect(config).to.have.property("serviceName").that.equals("UNITTESTSVCNAME"))
    it('should have overridden identity', () => expect(config).to.have.property("identity").that.equals("UNITTESTIDENTITY"))
  })

  describe('Partial Env', () => {
    var config
    before(() => {
      process.env.PORT = "3002"
      process.env.ACCESS_LOG_PATH = "./TEST_LOGS2"
      process.env.ACCESS_LOG_ROTATION = "3d"
      process.env.SERVICENAME = "UNITTESTSVCNAME2"
      config = mockRequire.reRequire('../src/config')
    })
    after(() => {
      delete process.env.PORT
      delete process.env.ACCESS_LOG_PATH
      delete process.env.ACCESS_LOG_ROTATION
      delete process.env.SERVICENAME
    })

    it('should have overridden port', () => expect(config).to.have.property("port").that.equals(3002))
    it('should have overridden accessLogPath', () => expect(config).to.have.property("accessLogPath").that.equals("./TEST_LOGS2"))
    it('should have overridden accessLogRotation', () => expect(config).to.have.property("accessLogRotation").that.equals("3d"))
    it('should have overridden serviceName', () => expect(config).to.have.property("serviceName").that.equals("UNITTESTSVCNAME2"))
    it('should have generated identity', () => expect(config).to.have.property("identity").that.equals("[UNITTESTSVCNAME2 TESTHOSTNAME]"))
  })
})
