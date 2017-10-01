var gulp=require("gulp");
var _ = require('lodash');
var webpack = require('webpack');
var del = require('del');
var project = require('../lib/project')();
var config = require('../config.' + project).webpack;
//var compileLogger = require('../lib/compileLogger')();
// 生成js/css
gulp.task('webpack', ['clean:webpack'], function (callback) {
    // webpack作为一个普通的node模块使用
    webpack(require('../webpack.config.js')(), function (err, stats) {
        // 让webpack的日志输出更好看
        //compileLogger(err, stats);
        // 这个callback是为了解决gulp异步任务的核心，强烈注意
        callback();
    });
});

// 生成js/css-监听模式
gulp.task('watch:webpack', ['clean:webpack'], function () {
    webpack(_.merge(require('../webpack.config.js')(), {
        watch: true
    })).watch(200, function (err, stats) {
        //compileLogger(err, stats);
        // 该异步任务不需要结束，所以不需要callback
        // 该任务不结束，所以webpack的增量更新由webpack自己完成
    });
});

// 生成js/css-build模式
gulp.task('build:webpack', ['clean:webpack'], function (callback) {
    // webpack.config.js返回值是一个函数，而不是一个简单的json对象
    // 接受production参数，可以得到production模式的配置信息
    webpack(_.merge(require('../webpack.config.js')('production'), {
        devtool: false
    }), function (err, stats) {
        //compileLogger(err, stats);
        callback();
    });
});

// 清理js/css
gulp.task('clean:webpack', function () {
    return del([
        config.jsDest,
        config.cssDest
    ], { force: true });
});