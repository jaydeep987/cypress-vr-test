module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'web',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ]
      }
    ]
  }
}