const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './app/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        https: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    stats: 'errors-only'
};