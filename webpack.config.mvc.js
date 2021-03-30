var path = require('path')
var {merge} = require('webpack-merge');
var common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
var config = require('./config.js')
var plugins = []
var htmls = config.MVCHtmlWebpackPlugin
for (let key in htmls) {
	if (config.production.entries[key]) {
		var htmlConfig = htmls[key]
        var version = +new Date
		plugins.push(new HtmlWebpackPlugin({
			version: version,
			template: path.join(__dirname, `./templates/${htmlConfig.template}`),
			inject: false,
			filename: path.join(__dirname, '../Views/' + htmlConfig.filename) ,
			chunks: [key],
			entry: key,
            title : htmlConfig.title,
            minify : false
		}))
	}
}

module.exports = merge(common, {
    // 编译输出的js及路径
    output: {
        path: path.resolve(__dirname, '../wwwroot/bundles')
    },
    // optimization: {
    //     splitChunks: {
    //         // chunks: 'all',
    //         cacheGroups:{
    //             commons: {
    //                 name: 'vendors',
    //                 chunks: 'all',
    //             },
    //         }
    //     },
    // },
    externals: {
		'react': 'React',
        'react-dom': 'ReactDOM',
        "antd":'antd'
	},
    plugins:(([
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest: require('../wwwroot/bundles/vendor.json'),
        })
    ]).concat(common.plugins)).concat(
        plugins
    )
});