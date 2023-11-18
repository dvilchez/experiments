const path = require("path");

module.exports = {
  entry: {
    embeddings: "./src/embeddings.test.ts",
    segmentation: "./src/segmentation.test.ts",
    semanticsearch: "./src/semantic-search.test.ts"
  }, // Assuming your entry file is src/index.ts
  output: {
    filename: "[name].test.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"] // Resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};
