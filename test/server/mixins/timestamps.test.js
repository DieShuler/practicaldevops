'use strict'

// Import the sinon library so that you can have method "stubs"

const sinon = require('sinon')
// Imports the the chai assertion/testing library
const expect = require('chai').expect
// Imports the file that we are going to run this test against.
const mixin = require('../../../server/mixins/timestamps.js')
const utils = require('../../../server/mixins/utils')

// Main body of the testing logic.
// It usually a good idea to write out what your tests should do 
// with pseudo code before worrying to much about how to test them.

describe('Timestamps Mixin', () => {
  // D.R.Y. - Define the Model and updateTimestamps objects
  // for the whole test.
  let Model, updateTimestamps
  // stub out the methods from the actual function as 
  // sinon versions for testing.
  beforeEach(() => {
    Model = {
      defineProperty: sinon.stub(),
      observe: sinon.stub(),
    }
    updateTimestamps = sinon.stub(utils, 'updateTimestamps')
  })
  // make sure to restore updateTimestamps to not sinon
  // versions once the test has run through.
  afterEach(() => {
    updateTimestamps.restore()
  })
  it('should define a createdAt property', () => {
    // Don't need to define the Model anymore because we included this
    // in 'beforeEach'
    // const Model = {
    //   // Sinon stubs contains a whole bunch of testing functionality to
    //   // test if our function is doing what we want it to.
    //   defineProperty: sinon.stub(),
    // }
    // Call your Model
    mixin(Model)
    expect(Model.defineProperty.calledWith('createdAt', {
      type: Date,
      default: '$now',
    })).to.be.true
  })
  // This test is almost identical to the previous. Just have to change
  // createdAt to updatedAt
  it('should define an updatedAt property', () => {
    // Don't need to define the Model anymore because we included this
    // in 'beforeEach'
    // const Model = {
    //   defineProperty: sinon.stub(),
    // }
    mixin(Model)
    expect(Model.defineProperty.calledWith('updatedAt', {
      type: Date,
      default: '$now'
    })).to.be.true
  })

  // This is what we thought we wanted to test for the timestamps mixin.
  // it('should update instances updatedAt on a before save event')
  // it('should update requests updatedAt on a before save event')
  // With moving updateTimestamps to a helper function in utils/index.js
  // we just need to make sure it's calling that function properly.
  it('should call to #utils.updateTimestamps on a `before save` hook', () => {
    // Don't need to define the Model anymore because we included this
    // in 'beforeEach'
    // const Model = {
    //   observe: sinon.stub(),
    // }
    // This will grab the utils/updateTimestamps function and swap in a sinon
    // stub function instead.

    // Don't need to create another updateTimestamps since we're doing this
    // in 'beforeEach' already.
    // const updateTimestamps = sinon.stub(utils, 'updateTimestamps')
    mixin(Model)
    expect(Model.observe.calledWith('before save', updateTimestamps)).to.be.true
    // The sinon.stub() call above will replace the actual function code and not
    // just the stuff here in the test file.  In order to make sure updateTimestamps
    // continues to work, we have to run: 
    // updateTimestamps.restore()
    // except we don't need to because we put it in 'afterEach'
  })
})