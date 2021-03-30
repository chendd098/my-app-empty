var webpack = require('webpack');
var path = require('path')
module.exports = {
    entry: {
        "vendor" : [
            'es6-promise',
            'axios'
        ]
    },

    mode : 'production',
    
    resolve: {
		modules: [path.join(__dirname, "src"), "node_modules"]
	},
    output: {
        path: path.join(__dirname, '../wwwroot/bundles'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../wwwroot/bundles/[name].json'),
            name: '[name]'
            // context:  __dirname
        })
    ]
};