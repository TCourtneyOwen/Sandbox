const customFunctions = require('./customfunctions');
const assert = require('assert');

describe('Custom Functions', function() {
    describe('Custom Functions Samples', function() {
      it('should verify sample custom functions work as expected', function() {
        const addResult = customFunctions.add(2,3);  
        assert.strictEqual(addResult, 5);
      });
    });
  });



