/* jshint node: true */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV;

var baseConfig = {
    context: path.join(__dirname),
    entry: './lib/index.js',
    output: {
        path: path.join(__dirname),
        filename: 'dist/react-listview.js',
        libraryTarget: 'commonjs',
        library: 'ReactListView'
    },
    resolve: {
        root: path.resolve('./node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                // Query parameters are passed to node-sass
                loader: 'style!css!sass?outputStyle=expanded&' +
                'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
                'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
            },
            {
                test: /(\.js)|(\.jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};


if (env === 'development') {
    baseConfig.output = {
        path: path.join(__dirname),
        filename: 'react-listview.js'
    };

    baseConfig.plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve('./examples/simple/index.html'),
            hash: true,
            filename: 'index.html',
            inject: 'body'
        })
    ];
    baseConfig.entry = './examples/simple/demo.js';
}

if (env === 'production') {
    baseConfig.externals = {
        'react': 'var React'
    };
}


module.exports = baseConfig;
