const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { createStyleRule, wrapLoaderToExtractTextPlugin } = require('webpack-features');

exports.createStyleRules = function({ target, production }, { cssModulesPath } = {}) {
  const postCssConfig = require('../postcss.config')({ sourceMap: !production });
  const env = { target, production };

  const rules = [
    createStyleRule(env, {
      postcss: postCssConfig,
      modulesPath: cssModulesPath,
    }),
    createStyleRule(env, { 
      postcss: postCssConfig,
      modulesPath: cssModulesPath,
      modules: true
    }),

    createStyleRule(env, { 
      postcss: postCssConfig,
      modulesPath: cssModulesPath,
      preprocessor: 'emotion'
    }),

    createStyleRule(env, { 
      postcss: postCssConfig,
      modulesPath: cssModulesPath,
      preprocessor: 'scss',
      modules: false
    }),
    createStyleRule(env, { 
      postcss: postCssConfig,
      modulesPath: cssModulesPath,
      preprocessor: 'scss',
      modules: true
    })
  ];

  if (production) {
    for (const rule of rules) {
      rule.use = ExtractTextPlugin.extract(wrapLoaderToExtractTextPlugin(rule.use));
    }
  }

  return rules;
};
