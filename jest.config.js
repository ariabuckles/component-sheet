const path = require('path');

module.exports = {
    moduleNameMapper: {
        '^react-native$': path.resolve(
            __dirname,
            'node_modules',
            'react-native-web',
            'dist',
            'cjs'
        ),

        '^@component-sheet/([^/]+)$': '@component-sheet/$1/src',
    },

    setupFiles: [
        path.resolve(
            __dirname,
            'node_modules',
            'react-native-web',
            'jest',
            'setup.js'
        ),
        path.resolve(__dirname, 'jest.setup.js'),
    ],

    testEnvironment: 'jsdom',

    verbose: true,
};
