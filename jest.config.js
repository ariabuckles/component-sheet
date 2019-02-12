const path = require("path");

module.exports = {
    moduleNameMapper: {
        "^react-native$": path.resolve(
            __dirname,
            "node_modules",
            "react-native-web",
            "dist",
            "cjs"
        ),
    },

    setupFiles: [
        path.resolve(
            __dirname,
            "node_modules",
            "react-native-web",
            "jest",
            "setup.js"
        ),
        path.resolve(__dirname, 'jest.setup.js'),
    ],

    testEnvironment: "jsdom",

    reporters: ["jest-spec-reporter"],
};
