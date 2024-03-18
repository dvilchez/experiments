const webpack = require("webpack");
const path = require("path");
const { createFsFromVolume, Volume } = require("memfs");

const contains = (str, substr) => {
  return str.indexOf(substr) > -1;
};
const fs = createFsFromVolume(new Volume());

module.exports = {
  testFramework: {
    config: {
      ui: "bdd",
      timeout: "4000"
    }
  },
  plugins: [
    {
      name: "mime",
      resolveMimeType(context) {
        if (context.path.endsWith(".ts") || context.path.endsWith(".js")) {
          return "js";
        }
      }
    },
    {
      name: "runner",
      transform(context) {
        return new Promise((resolve, reject) => {
          if (!contains(context.path, ".test.ts")) {
            return resolve();
          }
          const config = {
            entry: "." + context.path, // Assuming your entry file is src/index.ts
            output: {
              filename: "bundle.js",
              path: path.resolve(__dirname, "bin")
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
            }
          };
          const compiler = webpack(config);
          compiler.outputFileSystem = fs;
          compiler.run((err, stats) => {
            compiler.close((closeErr) => {
              if (closeErr) console.log(closeErr);
            });
            if (err) {
              reject(err);
            } else {
              fs.readFile(
                path.resolve(__dirname, "bin/bundle.js"),
                "utf8",
                (err, content) => {
                  resolve(content);
                }
              );
            }
          });
        });
      }
    }
  ]
};
