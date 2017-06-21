var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.gruntDependentStyles = {
  defaultOpts: function (test) {
    var files = grunt.config('dependentStyles.result');
    test.equal(files.length, 3, 'Should be 3 files in total');

    test.done();
  },

  useNamespace: function (test) {
    var files = grunt.config('dependentStyles.result.test');
    test.equal(files.length, 3, 'Should be 3 files in total');

    test.done();
  },

  filterResultsForDuplicate: function (test) {
    var files = grunt.config('dependentStyles.result.filter');
    test.equal(files.length, 4, 'Should be 3 files in total');

    test.done();
  }
};
