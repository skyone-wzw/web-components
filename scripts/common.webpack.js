const path = require("path");
const WebpackBar = require("webpackbar");
const {PROJECT_PATH} = require("./const");
const DotenvPlugin = require("./dotenv-plugin");

module.exports = {
    stats: "errors-warnings",
    entry: {
        "web-components": path.resolve(PROJECT_PATH, "./src/index.ts"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {},
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(PROJECT_PATH, "tsconfig.json"),
                        },
                    },
                ],
            },
            {
                test: /\.tmpl$/,
                use: [
                    {
                        loader: path.resolve(PROJECT_PATH, "scripts/template-loader.js"),
                    },
                ],
            },
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new WebpackBar({
            name: "Build project",
            color: "#52c41a",
        }),
        new DotenvPlugin({
            path: path.resolve(PROJECT_PATH, ".env"),
        }),
    ],
};
