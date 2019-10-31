const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

module.exports = async ({ config }) => {
  config.node = {
    fs: 'empty',
    module: 'empty',
  };
  config.optimization.splitChunks = undefined;
  config.plugins.push(new webpack.DefinePlugin({
    ROOT_DIR: JSON.stringify(path.resolve(process.cwd(), 'src/app/')),
    ALL_DATA_MODULES_REGEXP: `/ui-components\\/.*\\/__test\\/data\\/.*\\.ts$/`,
    COMPONENT_MODULES_REGEXP: `/ui-components\\/[\\w-]*\\/[\\w-]*.component.ts$/`,
  }));

  return config;
}
