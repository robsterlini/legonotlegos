module.exports = function(config) {

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
