var feSrc = path.resolve('./src');
var projectDir = path.resolve('../');

module.exports = {
    feSrc: feSrc,
    projectDir: projectDir,

    // webpack任务
    webpack: {
        context: feSrc + '/pages/@(web|cooperation|users)',
        src: getFiles(feSrc + '/pages/@(web|cooperation|users)', 'js'),

        jsDest: projectDir + '/app/assets/javascripts',
        cssDest: projectDir + '/app/assets/stylesheets'
    },

    // views任务
    views: {
        pagesSrc: feSrc + '/pages/@(web|cooperation|users)/**/*+(erb|builder)',
        componentsSrc: feSrc + '/components/@(web|cooperation|users)/**/*.erb',

        dest: projectDir + '/app/views'
    },

    // images任务
    images: {
        src: [
            feSrc + '/images/**/*+(jpg|jpeg|png|gif|svg)'
        ],

        dest: projectDir + '/public/images'
    },

    // sprites任务
    sprites: {
        src: feSrc + '/sprites/web/**/*',
        cssDest: feSrc + '/components/web/common',
        imgDest: feSrc + '/images/web'
    }
};