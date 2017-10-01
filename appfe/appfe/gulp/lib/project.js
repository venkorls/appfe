module.exports = function () {
    var argv;
    argv = process.argv[process.argv.length - 1].replace("--", "");
    return 'web';
}