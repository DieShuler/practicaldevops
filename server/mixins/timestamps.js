'use strict'

const utils = require('./utils')
// This is the basic format for a "mixin" file.
// Export a function that "receives" the model it's going to be included on.
module.exports = function timestampMixin (Model) {
  Model.defineProperty('createdAt', {
    type: Date,
    default: '$now',
  })
  Model.defineProperty('updatedAt', {
    type: Date,
    default: '$now',
  })
  // Normally, updatedAt would be written like this:
  // Model.observe('before save' (context, next) => {})
  // With 'context' being the function to watch out for and
  // 'next' to be what to do after seeing the context.
  // In order to have your test framework test this though, we'd have to
  // figure out how to stub out the event and then event listener functions
  // to make sure it's triggering properly.  Instead, we're just going to
  // break the updatedAt into a 'helper' function so that we can test
  // whether it's being called with the proper text and time.
  // Note that utils is the folder inside mixins where we will keep
  // all 'helper' functions.
  Model.observe('before save', utils.updateTimestamps)
}
