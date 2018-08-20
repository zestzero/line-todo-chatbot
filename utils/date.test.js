
const chai = require('chai')
const expect = chai.expect
const { getFormatDateTime } = require('./date')

describe('Date helper', function () {
  describe('getFormatDateTime', function () {
    it('should return null from given invalid date and time', function () {
      const actual = getFormatDateTime('datetime', '13:00')
      expect(actual).to.equal(null)
    })

    it('should return correct result from given date and time', function () {
      const actual = getFormatDateTime('3/5/18', '13:00')
      expect(actual.format()).to.equal('2018-05-03T13:00:00+07:00')
    })
  })
})
