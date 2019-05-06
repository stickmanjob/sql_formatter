module: {
  rules: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },      
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
        }
        // other vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(jpg|png|otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
      loader: 'url-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
  ]
}