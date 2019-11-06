const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
    entry: {
        auth: './src/pages/auth/AuthApp.jsx',
        dashboard: './src/pages/dashboard/DashboardApp.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'src/dist/js')
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['src/dist/js']
        })
    ],
    resolve: {
        extensions: ['.js','.jsx','.css'],
        alias: {
            '@src': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
        {
            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                name: '[name].[ext]',
                outputPath: '../fonts/',    // where the fonts will go
                publicPath: '/src/global/media/fonts'       // override the default path
                }
            }]
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
        {
            test: /\.jsx?/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query:{
                presets: ['@babel/react', '@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime']
            }
        },
        {
            test: /\.html$/, 
            use: 'html-loader' 
        },
        {
            test: /\.md$/,
            use: [
              {
                loader: "html-loader"
              },
              {
                loader: "markdown-loader",
              }
            ]
        }
    ]}
};
module.exports = config;