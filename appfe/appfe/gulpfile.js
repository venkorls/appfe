var requireDir = require('require-dir');
var gulp = require('gulp');
// 递归引入gulp/tasks目录下的文件
requireDir('./gulp/tasks', { recurse: true });