/**
 * Build Task
 * @module build/tasks/build
 */
const gulp = require('gulp');
const argv = require('yargs').argv
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const fs = require('fs');
const replace = require('gulp-replace');

// Environment Files
let envFile = null;
let devEnv = require('../../environments/dev.json');
let stagingEnv = require('../../environments/staging.json');
let productionEnv = require('../../environments/production.json');

const wabRoot = './wab/arcgis-web-appbuilder-2.6/';
const stemapp = wabRoot + 'client/stemapp/';
const appRoot = wabRoot + 'server/apps/2/';

const src = './src/**/*';
const configs = './configs/**/*';

var tempDir = './tmp';

// List of our folders we want to watch for changes
const watchedFolders = [
    src,
    configs
]

// Default task.  Called when just 'gulp' is run
gulp.task('default', callback => runSequence(
        'load-env',
        'configure',
        'copy-src',
        'copy-configs',
        'watch',
        callback
));

// Copy tasks that copies code from a source and to a dest
gulp.task('copy', callback => runSequence(
    [
        'copy-src',
        'copy-configs'
    ],
    callback
));

gulp.task('copy-src', function(callback){
    gulp.src(src)
        .pipe(gulp.dest(appRoot));

    callback();
});

gulp.task('copy-configs', function(callback){
    gulp.src(tempDir + '/**/*') // The source is the temp dir
        .pipe(gulp.dest(appRoot));

    callback();
});

gulp.task('watch', function(callback){
    gulp.watch(watchedFolders, ['copy']);
    
});

gulp.task('configure', function(callback){
    // Create a temp folder to hold the results of the replace that we're about to do
    if (!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir);
    }

    // Replace values
    return gulp.src(configs) // All config files
        .pipe(replace('@@@myCustomGpToolEndpoint@@@', envFile.myCustomGpToolEndpoint))
        .pipe(gulp.dest(tempDir));

    callback();
});

gulp.task('load-env', function(callback){

    if(argv.env == "dev") {
        console.log("Loading dev env file.");
        envFile = devEnv;
    } else if(argv.env == "staging") {
        console.log("Loading staging env file.");
        envFile = stagingEnv;
    } else if(argv.env == "production") {
        console.log("Loading production env file.");
        envFile = productionEnv;
    } else {
        console.log("Loading dev env file by default.");
        envFile = devEnv;
    }

    callback();
});




