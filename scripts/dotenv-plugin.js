const fs = require("fs");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = class DotenvPlugin {
    constructor(options) {
        this.options = Object.assign({
            path: ".env",
        }, options);
    }

    apply(compiler) {
        const envs = this.parseDotenvFile(this.options.path);
        new (webpack.DefinePlugin)(envs).apply(compiler);
    }

    parseDotenvFile(path) {
        const content = fs.readFileSync(path, "utf-8");
        const envs = dotenv.parse(content);
        return Object.keys(envs).reduce((acc, key) => {
            acc[`process.env.${key}`] = JSON.stringify(envs[key]);
            return acc;
        }, {});
    }
}
