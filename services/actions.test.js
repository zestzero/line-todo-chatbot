const moment = require('moment')
const chai = require('chai')
const expect = chai.expect
const { parseAction } = require('./actions')
const { ERROR_MSG } = require('../utils/constants')

// 1. task : date/month/year : time e.g Buy milk : 3/5/18 : 13:00
// 2. task : today : time e.g Finsh writing shopping list : today : 15:30
// 3. task : tomorrow : time e.g Watch movie : tomorrow : 18:00

describe('Action', function () {
  describe('parseAction', function () {
    it('should return error from given invalid input', function () {
      const actual = parseAction('Buy milk : 3-5-18 : 13:00')

      expect(actual.error).to.equal(ERROR_MSG.ACTION.INVALID)
    })

    it('should return correct action from given input', function () {
      const actual = parseAction('Buy milk : 3/5/18 : 13:00')

      expect(actual.content).to.equal('Buy milk')
      expect(actual.dateTime).to.equal(moment('2018-05-03 13:00').format())
    })

    it('should return correct action from given input with date as `today`', function () {
      const actual = parseAction('Finsh writing shopping list : today : 15:30')

      expect(actual.content).to.equal('Finsh writing shopping list')
      expect(moment(actual.dateTime).date()).to.equal(moment().date())
      expect(moment(actual.dateTime).hour()).to.equal(15)
      expect(moment(actual.dateTime).minute()).to.equal(30)
    })

    it('should return correct action from given input with date as `tomorrow`', function () {
      const actual = parseAction('Watch movie : tomorrow : 18:00')

      expect(actual.content).to.equal('Watch movie')
      expect(moment(actual.dateTime).date()).to.equal(moment().add(1, 'days').date())
      expect(moment(actual.dateTime).hour()).to.equal(18)
      expect(moment(actual.dateTime).minute()).to.equal(0)
    })

    it('should return correct action from given input without time', function () {
      const actual = parseAction('Read book : tomorrow')

      expect(actual.content).to.equal('Read book')
      expect(moment(actual.dateTime).date()).to.equal(moment().add(1, 'days').date())
      expect(moment(actual.dateTime).hour()).to.equal(0)
      expect(moment(actual.dateTime).minute()).to.equal(0)
    })
  })
})
