var scssGraph = require('sass-graph');
var pkg = require('../package.json');
var path = require('path');

module.exports = function dependentStylesExports(grunt) {
  /**
   * Builds import tree for incoming scss file
   * @param {String} srcFiles
   * @param {Object} opts
   * @returns {Array.<String>}
   */
  function getDependentStyles(srcFiles, opts) {
    var src = Array.isArray(srcFiles) ? srcFiles : [srcFiles];
    var files = [];

    src.forEach(function eachSrcFile(scssGlob) {
      var scssFiles = grunt.file.expand(scssGlob);

      scssFiles.forEach(function eachScssFile(scssFile) {
        var graph = scssGraph.parseFile(scssFile, opts);

        Array.prototype.push.apply(files, Object.keys(graph.index));
      }, this);
    }, this);

    return files;
  }

  grunt.registerMultiTask(pkg.pluginName, pkg.description, function dependentStyles() {
    var options = this.options({
      namespace: grunt.task.current.target,
      skipPartials: true,
      styleOpts: {}
    });

    var dependentFiles = [];

    this.files.forEach(function eachFile(file) {
      Array.prototype.push.apply(
        dependentFiles,
        file.src.reduce(function reduceSrc(result, filePath) {
          var baseName = path.basename(filePath);
          return baseName[0] !== '_' ? result.concat(getDependentStyles(filePath, options.styleOpts)) : result;
        }, [])
      );
    });

    dependentFiles = dependentFiles.filter(function filterFiles(item, pos, self) {
      return self.indexOf(item) === pos;
    });

    var configKey = [pkg.pluginName, 'result']
      .concat(options.namespace)
      .filter(function filterKeys(i) { return i; })
      .join('.');

    grunt.config(configKey, dependentFiles);

    grunt.verbose.writeln('Put ' + dependentFiles.length + ' style files into ' + configKey);
    grunt.log.ok('Found ' + dependentFiles.length + ' dependent style files');
  });
};
