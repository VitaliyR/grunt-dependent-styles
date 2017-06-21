# grunt-dependent-styles

> Get all nested imported files from passed SCSS

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dependent-styles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dependent-styles');
```

## Usage

The result, which contains dependent style files, will be placed into `grunt.config` at `dependentStyles.result` section.
If `namespace` is provided - it will be appended to path string: `dependentStyles.result.theNamespace`.
 
You can pass found style files to the next grunt task, using Grunt template string `<%= dependentStyles.result %>`.

Useful, when you need to 

```js
grunt.initConfig({
  dependentStyles: {
    options: {
      namespace: 'targetStyles'
    },
    your_target: {
      src: './target.scss'
    }
  },
  
  postcss: {
    your_target: {
      src: ['<%= dependentStyles.result.targetStyles %>'],
      options: {
        processors: [
          stylelint()
        ]
      }
    }
  }
});

grunt.registerTask('css', ['dependentStyles:your_target', 'postcss:your_target']);
```

### Options

#### options.namespace
Type: `String`
Default value: `null`

Dependent styles result object namespace.

#### options.styleOpts
Type: `Object`
Default value: `{}`

Options for [sass-graph](https://github.com/xzyfer/sass-graph) plugin.

