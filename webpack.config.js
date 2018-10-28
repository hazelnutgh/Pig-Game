const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const cleanP = require('clean-webpack-plugin');
const cssPlugin = require('mini-css-extract-plugin');

module.export = {
    entry: {
        app: "./src/js/main.js"
    },
    output: {
        filename: "./[name]_app.js",
        path: path.resolve(__dirname,'public')
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    cssPlugin.loader,
                    "css-loader",
                    {
                        loader: "node-sass",
                        options: {
                            outputStyle: "compressed"
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg)/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "/imgz"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanP(['dis']),
        new htmlPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new cssPlugin({
            filename: "[name].css",
            chunck: "[id].css"
        })
    ]
}