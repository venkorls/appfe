var _ = require('lodash');
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require('autoprefixer');
var flexibility = require('postcss-flexibility');
var sorting = require('postcss-sorting');
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var will_change = require('postcss-will-change');
var cssnano = require('cssnano');

var project = require('./lib/project')();
var config = require('./config.' + project).webpack;


// loaders����
var getLoaders = function (env) {
    return [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|vendor)/,
        loader: 'babel?presets[]=es2015&cacheDirectory=true!preprocess?PROJECT=' + project
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
    }, {
        test: /\/jquery\.js$/,
        loader: 'expose?$!expose?jQuery!expose?jquery'
    }, {
        test: /\.xtpl$/,
        loader: 'xtpl'
    }, {
        test: /\.modernizrrc$/,
        loader: "modernizr"
    }];
};

// ��������
var getAlias = function (env) {
    return {
        // ����
        'jquery': path.resolve(__dirname, '../src/vendor/jquery2/jquery.js'),

        // ������������
        'jquery.js': path.resolve(__dirname, '../src/vendor/jquery2/jquery.js'),
    };
};

// �������
var getPlugins = function (env) {
    var defaultPlugins = [
        // ��������Ǳ�����������������������ʱ���Զ�����ģ��
        new webpack.ProvidePlugin({
            '$': 'jquery.js',
            'jquery': 'jquery.js',
            'jQuery': 'jquery.js',
        }),
        // ���빫��ģ��
        new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' }),
        new ExtractTextPlugin(
            path.join('../../stylesheets', project, '/[name].css'), {
                allChunks: true
            }
        )
    ];

    if (env === 'production') {
        // ����ģʽ�����ã�ȥ���������ظ��Ĳ��/ѹ��js/�ų�����Ĳ��
        plugins = _.union(defaultPlugins, [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                mangle: {
                    except: ['$', 'jQuery']
                }
            }),
            new webpack.NoErrorsPlugin()
        ]);
    } else {
        plugins = _.union(defaultPlugins, []);
    }

    return plugins;
};

// postcss����
var getPostcss = function (env) {
    var postcss = [
        autoprefixer({ browers: ['last 2 versions', 'ie >= 9', '> 5% in CN'] }),
        flexibility,
        will_change,
        color_rgba_fallback,
        opacity,
        pseudoelements,
        sorting
    ];

    if (env === 'production') {
        // ����ģʽ�����ã�cssѹ��
        return function () {
            return _.union([
                cssnano({
                    // �ر�cssnano��autoprefixerѡ���Ȼ���ǰ���autoprefixer��ͻ
                    autoprefixer: false,
                    reduceIdents: false,
                    zindex: false,
                    discardUnused: false,
                    mergeIdents: false
                })
            ], postcss);
        };
    } else {
        return function () {
            return _.union([], postcss);
        }
    }
};


// ��Ϊ�����������ã���������
module.exports = function (env) {
    return {
        context: config.context,
        entry: config.src,
        output: {
            path: path.join(config.jsDest, project),
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash:8].js',
            publicPath: '/assets/' + project + '/'
        },
        devtool: "eval",
        watch: false,
        profile: true,
        cache: true,
        module: {
            loaders: getLoaders(env)
        },
        resolve: {
            alias: getAlias(env)
        },
        plugins: getPlugins(env),
        //postcss: getPostcss(env)
    };
}

//module.exports = {
//    entry: './src/main.js',
//    output: {
//        path: path.resolve(__dirname, './dist'),
//        publicPath: '/dist/',
//        filename: 'build.js'
//    },
//    module: {
//        rules: [
//            {
//                test: /\.vue$/,
//                loader: 'vue-loader',
//                options: {
//                    loaders: {
//                    }
//                    // other vue-loader options go here
//                }
//            },

//            {
//                test: /\.js$/,
//                loader: 'babel-loader',
//                exclude: /node_modules/
//            },
//            {
//                test: /\.(png|jpg|gif|svg)$/,
//                loader: 'file-loader',
//                options: {
//                    name: '[name].[ext]?[hash]'
//                }
//            }
//        ]
//    },
//    resolve: {
//        alias: {
//            'vue$': 'vue/dist/vue.esm.js'
//        }
//    },
//    devServer: {
//        historyApiFallback: true,
//        noInfo: true
//    },
//    performance: {
//        hints: false
//    },
//    devtool: '#eval-source-map'
//}

//if (process.env.NODE_ENV === 'production') {
//    module.exports.devtool = '#source-map'
//    // http://vue-loader.vuejs.org/en/workflow/production.html
//    module.exports.plugins = (module.exports.plugins || []).concat([
//        new webpack.DefinePlugin({
//            'process.env': {
//                NODE_ENV: '"production"'
//            }
//        }),
//        new webpack.optimize.UglifyJsPlugin({
//            sourceMap: true,
//            compress: {
//                warnings: false
//            }
//        }),
//        new webpack.LoaderOptionsPlugin({
//            minimize: true,
//        }),
//    ])
//}
