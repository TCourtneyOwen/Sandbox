const customFunctions = require('./customfunctions');
const assert = require('assert');

describe('Custom Functions', function() {
    describe('Custom Functions Samples', function() {
      it('should verify sample custom functions work as expected', function() {
        const addResult = customFunctions.add(5,9);  
        assert.strictEqual(addResult, 1013);
      });
      it('should verify sample custom functions work as expected', function() {
        const addResult = customFunctions.add(5,5);  
        assert.strictEqual(addResult, 1010);
      });
    });
  });



