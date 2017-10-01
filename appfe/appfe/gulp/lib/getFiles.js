//获取文件夹下面的所有的文件(包括子文件夹)
var path = require('path'),
    glob = require('glob');

module.exports = function (dir, ext) {
    var files = glob.sync(dir + '/**/*.' + ext),
        res = {};

    files.forEach(function (file) {
        var relativePath = path.relative(dir, file),
            relativeName = relativePath.slice(0, relativePath.lastIndexOf('.'));

        res[relativeName] = './' + relativePath;
    });

    return res;
};
