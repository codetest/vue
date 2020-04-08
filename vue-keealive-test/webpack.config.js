const {VueLoaderPlugin} = require("vue-loader")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

module.exports = {
    entry: "./app.ts",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            /* config.module.rule('images') */
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5300,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: false,     
        splitChunks: {
            chunks: "initial",
            minSize: 102400,
            cacheGroups: {
                libs: {
                    name: "libcommon",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial"
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        port: 9000,
        open: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
}