var imagemin = require('gulp-imagemin');

// 图片构建
gulp.task('images', function () {
    return gulp.src(config.src)
        .pipe(plumber(handleErrors))
        .pipe(newer(config.dest))
        .pipe(logger({ showChange: true }))
        // 压缩图片
        .pipe(imagemin())
        .pipe(gulp.dest(config.dest));
});

// 图片构建-build版本
gulp.task('build:images', ['images']);

// 清理图片
gulp.task('clean:images', function () {
    return del([
        config.dest
    ], { force: true });
});