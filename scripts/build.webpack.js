const {merge} = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./common.webpack");
const {PROJECT_PATH} = require("./const");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        filename: "web-components/[name].[contenthash:8].js",
        path: path.resolve(PROJECT_PATH, "./dist"),
        assetModuleFilename: "web-components/fonts/[hash][ext]",
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    stats: {
        assets: true,
        entrypoints: false,
        modules: false,
        colors: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "web-components/[name].[contenthash:8].css",
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, "./public/web-components.ejs"),
            inject: false,
            minify: true,
            filename: "web-components.html",
            publicPath: "/",
        }),
    ],
});
