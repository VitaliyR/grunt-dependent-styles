/* eslint-disable import/no-extraneous-dependencies, global-require */

module.exports = function GruntFile(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    eslint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    dependentStyles: {
      defaultOpts: {
        options: {},
        src: ['test/fixtures/root.scss']
      },
      useNamespace: {
        options: {
          namespace: 'test'
        },
        src: ['test/fixtures/root.scss']
      },
      filterResultsForDuplicates: {
        options: {
          namespace: 'filter'
        },
        src: ['test/fixtures/root.scss', 'test/fixtures/secondRoot.scss']
      }
    },

    nodeunit: {
      tests: ['test/test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['dependentStyles', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['eslint', 'test']);
};
