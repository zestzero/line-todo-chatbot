
const chai = require('chai')
const expect = chai.expect
const { getFormatDateTime } = require('./date')

describe('Date helper', () => {
  describe('getFormatDateTime', () => {
    it('should return null from given invalid date and time', () => {
      const actual = getFormatDateTime('datetime', '13:00')
      expect(actual).to.equal(null)
    })

    it('should return correct result from given date and time', () => {
      const actual = getFormatDateTime('3/5/18', '13:00')
      expect(actual).to.equal('2018-05-03T13:00:00+07:00')
    })
  })
})
