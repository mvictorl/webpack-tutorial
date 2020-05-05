const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js', // точка входа, относительно параметра "context"
        analytics: './analytics.js' // вторая точка входа
    },
    output: {
        // filename: 'bundel.js', // выходной файл
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist') // путь до выходного файла
    },
    // Дополнительные параметры для расширений файлов по-умолчанию и создания alias'ов
    resolve: {
        extensions: ['.js', '.json'], // Значения расширений по умолчанию
        alias: {
            '@': path.resolve(__dirname, 'src') // Пример алиаса к папке "src"
        }
    },
    // Дополнительные параметры для оптимизации импорта (исключения дублирования)
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev // Только в режиме разработки
    },
    plugins: [
        new HTMLWebpackPlugin({
            // title: 'Webpack My Title', // работает, если нет в шаблоне (ниже)
            template: './index.html',
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // RegExp
                // use: ['style-loader', 'css-loader'] // Внедрение CSS в HTML
                // use: [MiniCssExtractPlugin.loader, 'css-loader'] // CSS в разные файлы
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev, // Hot Reload Modules, необходимо только в режиме разработки (поэтому дополнительная переменная)
                            reloadAll: true
                        }
                    }, 
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}