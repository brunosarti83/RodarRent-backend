const path = require('path');

module.exports = {
  entry: './src/handlers/sendEmail/emailTemplates/template1.jsx', // Entry point to your JSX file
  output: {
    filename: 'bundle.js', // Output bundle file name
    path: path.resolve(__dirname), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images', // Set the output folder for images
            },
          },
        ],
      },
    ],
  },
};
