const path = require('path')
// console.log(path.resolve(__dirname, 'dist'))
// 打包 从index.js开始打包
//重改配置文件后要重启npm run start
const ExtractTextPlugin = require('extract-text-webpack-plugin')//将css代码从main.js里抽离出来 解决css打包后混入js的问题
const HtmlWebpackPlugin = require('html-webpack-plugin')//自动将js和css引入html  抽离html 
const CopyWebpackPlugin = require('copy-webpack-plugin')//复制一个小图标(网站的必须小图标)
const devServer = require('webpack-dev-server')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js', //入口文件
    output: {//将生成的文件输出到dist目录
        path: path.resolve(__dirname, 'dist'),//path 模块 => 当前的物理路径  __dirname超级变量 ，会给出当前目录的绝对路径
        filename: '[name].js'
    },
    module: {
        rules: [//模块的规则
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader',//添加babel，babel-loader添加到内存

            },
            {
                test: /\.less$/,//匹配.less文件
                use: ExtractTextPlugin.extract({//使用插件
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                }),
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',  //行内样式
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils')//别名，指向src跟@一样
        },
        extensions: ['.js', '.json', '.css', '.less']
    },
    plugins: [//引入插件
        new ExtractTextPlugin('[name].css'),//[name]系统取名,也可以自己取名
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/favicon.ico', 
              to: 'favicon.ico' }
        ]),
        new webpack.ProvidePlugin({//lodash 作为工具库，是很多组件都会使用它，省去了到处import
            '_': 'lodash'    //引入其他的库 比如jquery
        })
    ],
    devServer: {
        port: '1314',
        before(app) {
            app.get('/api/test.json',(req, res) => {
                res.json({
                    code: 200,
                    message: 'hello world'
                })
            })//路由接口 得到地址
        }
    }
   
}