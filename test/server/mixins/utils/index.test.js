'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const utils = require('../../../../server/mixins/utils')

describe('Utility Functions', function () {
  describe('#updateTimestamps()', function () {
    it('should update `updatedAt` on instance', () => {
      // Define an "empty" function called context so that mocha
      // doesn't flip out that it doesn't exist.
      const context = {
        // needs to have an instance property
        instance: {},
      }
      // define a sinon stub called 'next' for the whatDoAfterHook
      const next = sinon.stub()

      utils.updateTimestamps(context, next)
      expect(context.instance.updatedAt).to.be.an.instanceof(Date)
      expect(next.called).to.be.true
    })
    // this test is almost identical, but since there won't be a detailed
    // property list if you have a list of objects that you're updating, we'll
    // use context.data instead of context.instance (single instance)
    it('should update `updatedAt` on a many request', () => {
      const context = {
        data: {},
      }
      const next = sinon.stub()

      utils.updateTimestamps(context, next)
      expect(context.data.updatedAt).to.be.an.instanceof(Date)
      expect(next.called).to.be.true
    })
  })
})