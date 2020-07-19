const sass = require('node-sass');
const htmlmin = require('html-minifier');

const input = 'src';
const output = 'dist';

const explanations = require('./src/_data/explanations.json');

const SCSS_OPTIONS = {
  includePaths: [
    `${input}/_includes`,
  ],
  outputStyle: 'compressed',
};

const inlineScss = (data, callback) => {
  const scssOptions = {
    ...SCSS_OPTIONS,
    data,
  };

  const scssCallback = (error, result) => {
    callback(null, !error ? result.css : '');

    if (error) {
      console.error('Error', error.line, error.message);
    }
  };

  sass.render(scssOptions, scssCallback);
};

module.exports = function(eleventyConfig) {

  // Scss
  eleventyConfig.addNunjucksAsyncFilter('inlineScss', inlineScss);

  // Transforms
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    }

    return content;
  });

  // Explanation pages
  const generateExplanationsByType = (arr, type) => arr[type].map(wrong => ({ type, wrong }));

  eleventyConfig.addCollection('explanations', collectionApi => {
    return [
      ...generateExplanationsByType(explanations, 'singular'),
      ...generateExplanationsByType(explanations, 'plural'),
    ];
  });

  // Layouts
  eleventyConfig.addLayoutAlias('default', 'base.njk');

  // Pass through files
  const filesToCopy = [
    `${input}/images`,
    `${input}/favicon.svg`,
    `${input}/favicon.png`,
  ];

  filesToCopy.forEach(file => {
    eleventyConfig.addPassthroughCopy(file);
  });

  return {
    dir: {
      input,
      output,
    },
    templateFormats : ['njk', 'md'],
    htmlTemplateEngine : 'njk',
    markdownTemplateEngine : 'njk',
    passthroughFileCopy: true,
  };
};
