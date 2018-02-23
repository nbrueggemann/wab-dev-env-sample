/**
 * Build Task
 * @module build/tasks/build
 */
const gulp = require('gulp');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

const wabRoot = './wab/arcgis-web-appbuilder-2.6/';
const stemapp = wabRoot + 'client/stemapp/';
const appRoot = wabRoot + 'server/apps/2/';

const src = './src/**/*';
const apps = './apps/**/*';

// List of our folders we want to watch for changes
const watchedFolders = [
    src,
    apps
]

// Default task.  Called when just 'gulp' is run
gulp.task('default', callback => runSequence(
    [
        'copy',
        'watch'
    ],
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

gulp.task('copy-src', function(){
    gulp.src(src)
        .pipe(gulp.dest(appRoot));
});

gulp.task('copy-configs', function(){
    gulp.src(apps)
        .pipe(gulp.dest(appRoot));
});

gulp.task('watch', function(){
    gulp.watch(watchedFolders, ['copy']);
});




