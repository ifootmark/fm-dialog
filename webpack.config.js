var webpack = require('webpack');
var version = require('./package.json').version;

module.exports = {
    entry: {
        'fm-dialog': './src/fm-dialog.js',
        'test': './src/test.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: `Dlg`,
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin('fm-dialog@' + version)
    ],
    externals: {
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }
};