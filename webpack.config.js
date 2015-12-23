/* jshint node: true */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var devIp = require('dev-ip');

var ip = devIp()[0] || 'localhost';
var env = process.env.NODE_ENV;
var componentName = 'ReactComponentKit';

var baseConfig = {
    context: path.join(__dirname),
    entry: './lib/index.js',
    output: {
        path: path.join(__dirname),
        filename: 'dist/index.js',
        libraryTarget: 'commonjs',
        library: componentName
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
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    }
};


if (env === 'development') {
    baseConfig.output = {
        path: path.join(__dirname),
        filename: 'index.js'
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
    baseConfig.devServer = {
        host: ip
    }
}

if (env === 'production') {
    baseConfig.externals = {
        'react': 'react',
        'react-dom': 'react-dom'
    };
}


module.exports = baseConfig;
