var webpack = require('webpack');
var path = require('path')
module.exports = {
    entry: {
        "vendor" : [
            'es6-promise',
            'moment',
            'react',
            'react-dom',
            'antd'
        ]
    },

    mode : 'development',
    
    resolve: {
		modules: [path.join(__dirname, "src"), "node_modules"]
	},
    output: {
        path: path.join(__dirname, './dlls'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './dlls/[name].json'),
            name: '[name]'
            // context:  __dirname
        })
    ]
};