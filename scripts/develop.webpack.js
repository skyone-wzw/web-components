const {merge} = require("webpack-merge");
const path = require("path");

const common = require("./common.webpack");
const {PROJECT_PATH, SERVER_HOST, SERVER_PORT} = require("./const");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
        filename: "web-components/[name].js",
        assetModuleFilename: "web-components/fonts/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader", "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, "./public/index.html"),
            publicPath: "/",
        }),
    ],
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
            index: "/",
        },
    },
});
