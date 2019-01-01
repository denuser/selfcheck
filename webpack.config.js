const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './client/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(es6|js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};