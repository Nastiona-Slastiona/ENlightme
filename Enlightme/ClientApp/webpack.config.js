const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isDevelopmentMode = process.env.NODE_ENV === 'development';

const generateStyleLoader = loaderName => {
    return [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                importLoaders: 2,
                sourceMap: isDevelopmentMode
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: isDevelopmentMode
            }
        },
        {
            loader: loaderName,
            options: {
                sourceMap: isDevelopmentMode,
                sassOptions: {
                    includePaths: ['src', 'node_modules']
                }
            }
        }
    ];
};

const generateUrlLoader = (mimeType, limit = 10000) => [{
    loader: 'url-loader',
    options: {
        limit,
        mimetype: mimeType
    }
}];

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    plugins: [
        new HTMLWebpackPlugin({ template: './public/index.html' }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css$/i,
                use: generateStyleLoader('sass-loader')
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: generateUrlLoader('image/png')
            },
            {
                test: /\.svg$/,
                loader: '@svgr/webpack',
                options: {
                    ref: true,
                    svgoConfig: {
                        plugins: [
                            {
                                removeViewBox: false,
                                removeDimensions: true,
                                inlineStyles: {
                                    onlyMatchedOnce: false
                                }
                            }
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            static: path.resolve(__dirname, 'src/static'),
            src: path.resolve(__dirname, 'src'),
            pages: path.resolve(__dirname, 'src/pages'),
            features: path.resolve(__dirname, 'src/features'),
            authentication: path.resolve(__dirname, 'src/features/authentication')
        },
        enforceExtension: false,
        extensions: ['.jsx', '.js', '.css', '.wasm', '.ico', '.gif', '.png', '.svg', '...']
    }
};