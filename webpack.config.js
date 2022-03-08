const path = require('path');
const { IgnorePlugin } = require('webpack');

const common = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.wasm$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    externals: {
        vscode: 'commonjs vscode'
    }
};

module.exports = [
    {
        ...common,
        target: 'webworker',
        entry: {
            extension: './src/browser/extension.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'web'),
            libraryTarget: 'commonjs'
        },
        plugins: [
            new IgnorePlugin({
                resourceRegExp: /mbs-plugin/
            })
        ]
    },
    {
        ...common,
        target: 'web',
        entry: {
            webview: './src/views/simple-webview-view.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'views')
        }
    }
];
