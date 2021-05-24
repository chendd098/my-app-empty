var path = require('path')
var {merge} = require('webpack-merge');
var common = require('./webpack.common');
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config.js')
var plugins = []
var htmls = config.production.htmlWebpackPlugin
for (let key in htmls) {
	if (config.production.entries[key]) {
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
    // 编译输出的js及路径
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].[hash].chunk.js',
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    externals : {
		'react': 'React',
        'react-dom': 'ReactDOM',
        "antd":'antd',
        "moment":'moment'
	},
    //（如果不需要3.2小节的追踪功能，可以注释掉下行代码）
    // devtool: 'source-map',
    plugins:[new CleanWebpackPlugin()].concat(
        plugins
    )
});