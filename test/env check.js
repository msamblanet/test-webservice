/**
 * Unit test to ensure the FAIL_UNIT_TESTS environment variable is NOT set
 * If it is set, the test fails
 */

 const expect = require('chai').expect


describe('Environment Check', () => {
  it('should not have FAIL_UNIT_TESTS', () => expect(process.env).to.not.have.property('FAIL_UNIT_TESTS'))
  it('should not have PORT', () => expect(process.env).to.not.have.property("PORT"))
  it('should not have ACCESS_LOG_PATH', () => expect(process.env).to.not.have.property("ACCESS_LOG_PATH"))
  it('should not have ACCESS_LOG_ROTATION', () => expect(process.env).to.not.have.property("ACCESS_LOG_ROTATION"))
  it('should not have SERVICENAME', () => expect(process.env).to.not.have.property("SERVICENAME"))
  it('should not have IDENTITY', () => expect(process.env).to.not.have.property("IDENTITY"))
})
