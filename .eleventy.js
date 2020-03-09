const postcss = require('postcss');

module.exports = function(config) {

  config.addNunjucksAsyncFilter('postcss', function(code, callback) {
    const css = postcss([
      require('postcss-import')({
        path: [
          'src/site/_includes/css/',
        ],
      }),
      require('postcss-simple-vars')({
        silent: true
      }),
      require('autoprefixer')(),
      require('cssnano')(),
    ])
    .use(require("postcss-import")())
    .process(code)
    .then(function(result) {
      callback(null, result.css);
    });
  });

  config.addLayoutAlias('default', 'base.njk');

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    templateFormats : ['njk', 'md'],
    htmlTemplateEngine : 'njk',
    markdownTemplateEngine : 'njk',
    passthroughFileCopy: true,
  };
};
