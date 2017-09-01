var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge2');


// 构建视图文件
gulp.task('sprites', function () {
    var spriteData = gulp.src(config.src)
        .pipe(plumber(handleErrors))
        .pipe(newer(config.imgDest))
        .pipe(logger({ showChange: true }))
        // 自动合并精灵图
        .pipe(spritesmith({
            cssName: 'sprites.css',
            imgName: 'sprites.png',
            // 指定css模板，根据模板生成对应的css代码
            cssTemplate: path.resolve('./gulp/lib/template.css.handlebars')
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(gulp.dest(config.imgDest));

    var cssStream = spriteData.css
        .pipe(gulp.dest(config.cssDest));

    // 将多个流合并，然后统一返回，这个是很重要功能
    return merge([imgStream, cssStream]);
});


// 清理视图文件
gulp.task('clean:sprites', function () {
    return del([
        config.imgDest + '/sprites.png',
        config.cssDest + '/sprites.css'
    ], { force: true });
});