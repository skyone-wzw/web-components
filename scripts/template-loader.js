const path = require("path");
const htmlMinifier = require("html-minifier-terser");

/**
 * A Webpack loader that minifies and parses HTML template files.
 *
 * @this {import("webpack").loader.LoaderContext}
 * @param source {string} The source code of the template file.
 */
module.exports = function (source) {
    this.cacheable && this.cacheable();
    this.async();

    const resourcePath = this.resourcePath;
    if (path.extname(resourcePath) !== ".tmpl") {
        throw new Error("This loader only handles .tmpl files.");
    }

    htmlMinifier.minify(source, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
    }).catch((error) => {
        this.emitError(new Error(`Error minifying template in ${resourcePath}: ${error.message}`));
    }).then((minified) => {
        if (!/^<template[\s\S]*>[\s\S]*<\/template>$/.test(minified)) {
            this.emitError(new Error(`Missing <template> element in ${resourcePath}.`));
            return "";
        }

        const code = `
const templateString = ${JSON.stringify(minified)};
const parser = new DOMParser();
const doc = parser.parseFromString(templateString, "text/html");
const template = doc.querySelector("template");

if (!template) {
    throw new Error("The template file must contain a <template> element.");
}

export default template;
    `.trim();

        const sourceMap = {
            version: 3,
            sources: [resourcePath],
            mappings: "",
            file: this.resourcePath,
            sourcesContent: [source],
            names: [],
        }

        this.callback(null, code, sourceMap);
    }).catch((error) => {
        this.emitError(new Error(`Error minifying template in ${resourcePath}: ${error.message}`));
    });
};
