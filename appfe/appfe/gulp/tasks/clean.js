var gulp = require('gulp');
// 并行执行sprites，images，views，webpack任务
gulp.task('default', [
    'sprites',
    'images',
    'views',
    'webpack'
]);