const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var LessPluginAutoPrefix = require('less-plugin-autoprefix')
var autoprefixPlugin = new LessPluginAutoPrefix()
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var config = require('./config.js');
module.exports = {
    // 入口js路径
    entry: config.development.entries,
    resolve: {
        // 设置module文件包含的路径
        modules: [path.join(__dirname, "./src"), "node_modules"],
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/, 
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                        },
                    }, {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                // css modules方式引入的
                test:/\.module\.less$/,
                include:path.join(__dirname,'./src'),
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    // },{
                    //     loader:"style-loader"
                    },{
                        loader:"css-loader",
                        options:{
                            modules: {
                                localIdentName:'[name]__[local]--[hash:base64:5]',
                            },
                        }
                    },{
                        loader:"less-loader",
                        options:{
                            sourceMap:true,
                            lessOptions:{
                                // plugins: [autoprefixPlugin]
                                javascriptEnabled: true,
                                paths: [path.resolve(__dirname, '../node_modules')],
                            }
                        }
                    }
                ]
            },
            {
                // css普通方式引入的
                test:/\.less$/,
                exclude: /\.module\.less$/,
                include:path.join(__dirname,'./src'),
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    // options: {},
                    // },{
                    //     loader:"style-loader"
                    },{
                        loader:"css-loader",
                        options:{}
                    },{
                        loader:"less-loader",
                        options:{
                            sourceMap:true,
                            lessOptions:{
                                // plugins: [autoprefixPlugin]
                                javascriptEnabled: true,
                                paths: [path.resolve(__dirname, '../node_modules')],
                            }
                        }
                    }
                ]
            },
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				// use: [{
				// 	loader: 'url-loader',
				// 	options: {
				// 		limit: 30000
				// 	}
                // }]
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                      maxSize: 4 * 1024 // 4kb
                    }
                }
			},
			{
				test: /\.(svg|ttf|eot|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
                // loader: 'file-loader'
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                      maxSize: 4 * 1024 // 4kb
                    }
                }
			}
        ],
    },
    plugins:[
            new MiniCssExtractPlugin({
                filename:  '[name].bundle.css',
                chunkFilename: '[id].bundle.css',
            }),
    ]
}