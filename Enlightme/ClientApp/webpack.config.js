const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopmentMode = process.env.NODE_ENV === 'development';

function generateStyleLoader(loaderName, isDevelopmentMode) {
    return [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: false,
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
            loader: 'resolve-url-loader',
            options: {}
        }, 
        {
            loader: loaderName,
            options: {
                sourceMap: true,
                sassOptions: {
                    includePaths: ['src', 'node_modules']
                }
            }
        }
    ];
}

function generateUrlLoader(mimeType, limit = 10000) {
    return [
        {
            loader: 'url-loader',
            options: {
                limit,
                mimetype: mimeType
            }
        }
        // {
        //     loader: 'file-loader',
        //     options: {
        //       name: '/public/icons/[name].[ext]'
        //     }
        // }
    ];
}

function getRules(isDevelopmentMode) {
    return [
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
            test: /\.s?css$/,
            use: generateStyleLoader('sass-loader', isDevelopmentMode)
        },
        {
            test: /\.(woff|woff2|ttf|eot)$/,
            type: 'asset/resource',
            generator: {
                filename: '[contenthash][ext]'
            }
        },
        {
            test: /\.svg$/,
            loader: '@svgr/webpack',
            options: {
                ref: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                    inlineStyles: {
                                        // see available settings on https://github.com/svg/svgo/issues/296#issuecomment-380208905
                                        onlyMatchedOnce: false
                                    }
                                }
                            }
                        },
                        'removeDimensions'
                    ]
                }
            }
        },
        {
            test: /\.(png|jpg)$/,
            use: generateUrlLoader('image/png')
        },
        {
            test: /\.gif$/,
            use: generateUrlLoader('image/gif')
        }
    ];
};

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
        rules: getRules()
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            static: path.resolve(__dirname, 'src/static'),
            src: path.resolve(__dirname, 'src'),
            pages: path.resolve(__dirname, 'src/pages'),
            features: path.resolve(__dirname, 'src/features'),
        },
        enforceExtension: false,
        extensions: ['.jsx', '.js', '.css', '.wasm', '.ico', '.gif', '.png', '.jpg', '.svg', '...']
    }
};