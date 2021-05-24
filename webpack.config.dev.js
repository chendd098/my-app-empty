const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config.js');
const webpack = require('webpack');
var plugins = []
var htmls = config.development.htmlWebpackPlugin
for (let key in htmls) {
	if (config.development.entries[key]) {
		var htmlConfig = htmls[key]
        var version = +new Date
        var filename = htmlConfig.filename || `${key}.html`
		plugins.push(new HtmlWebpackPlugin({
			version: version,
			template: path.join(__dirname, `./src/${htmlConfig.template}`),
			inject: true,
			filename: filename ,
			chunks: [key],
			entry: key,
			title : htmlConfig.title
		}))
	}
}
module.exports = merge(common, {
    plugins:(([
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./dlls/vendor.json'),
		})
	]).concat(common.plugins)).concat(plugins),
    output: {
        path: path.join(__dirname, 'hot'),
        // filename: 'js/[name].bundle.js',
        // chunkFilename: 'js/[name].[hash].chunk.js',
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
	devtool: 'eval-source-map',// 开发环境代码定位到行上
    // 动态监测并实时更新页面
    devServer:{
        // 内容的基础路径
        contentBase: path.resolve(__dirname, './'),
        // 默认8080，可不写
        port: 9000,
        // 热更新，无需刷新
        hot: true,
        proxy: {
			"/api": {
				target: "http://10.45.24.156:6001",
				pathRewrite: {"^/api" : ""}
			}
		},
		historyApiFallback: true,//BroswerRouter 设置
		// ip查看配置
		disableHostCheck: true,
		host: '0.0.0.0',
    },
});