import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';

import paths from './paths';
import initConfig from './config';

import { define } from './define-env';

const reactExternals = () => ({
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'prop-types': {
    root: 'PropTypes',
    commonjs2: 'prop-types',
    commonjs: 'prop-types',
    adm: 'prop-types',
  }
});

const { plugins, entries, rules } = initConfig({
  target: 'client', 
  production: true,
  BUILD_APPS: 'index',
});

const webpackConfig = {
  context: paths.src,
  entry: entries(),
  externals: reactExternals(),

  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    path: paths.build,
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'react-ui-component-template'
  },
  
  devtool: 'source-map',

  module: {
    rules: rules()
  },

  plugins: [
    new webpack.DefinePlugin(define({ production: true })),
    new webpack.NamedModulesPlugin(),
    new BabiliPlugin(),
    ...plugins()
  ],
  
  stats: {
    children: false
  },
};

module.exports = webpackConfig;
