module.exports = function (api) {
    api.cache(true);
    return {
        plugins: [],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "usage",
                    corejs: 3,
                }
            ]
        ],
    };
};
