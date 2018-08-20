
const chai = require('chai')
const expect = chai.expect
const { parseAction } = require('./actions')

// 1. task : date/month/year : time e.g Buy milk : 3/5/18 : 13:00
// 2. task : today : time e.g Finsh writing shopping list : today : 15:30
// 3. task : tomorrow : time e.g Watch movie : tomorrow : 18:00

describe('Action', function () {
  describe('parseAction', function () {
    it('should return correct action from given input', function () {
      const actual = parseAction('Buy milk : 3/5/18 : 13:00')

      expect(actual.content).to.equal('Buy milk')
      expect(actual.date).to.equal('3/5/18')
      expect(actual.time).to.equal('13:00')
    })
  })
})
