module.exports = (api) => ({
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "60",
                    firefox: "56",
                    safari: "10",
                    ie: "11",
                    ios: "9",
                    android: "4.4.2",
                },
                modules: api.env("commonjs") ? "commonjs" : false,
            }
        ],
    ],
});
