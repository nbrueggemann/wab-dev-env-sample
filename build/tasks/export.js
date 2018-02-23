/**
 * Export Task
 * @module build/tasks/export
 */
const paths = require('../paths');
const fs = require('fs-extra');
const gulp = require('gulp');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const mergeStream = require('merge-stream');
const path = require('path');

const WEB_APPBUILDER_VERSION = 2.6;
const EXPORT_ROOT = 'export';


/**
 * Export each Web AppBuilder application as a zip file.
 *
 * @name export
 * @example gulp export
 */
gulp.task('export', [], async () => {
	const wabRoot = path.join(paths.webAppBuilder.root, `arcgis-web-appbuilder-${WEB_APPBUILDER_VERSION}`);

	// Clear and create exports directory
    fs.emptyDirSync(EXPORT_ROOT);
    
    var apps = [];
    var safehouseApp = {};
    safehouseApp.appPath = "/server/apps/2";
    safehouseApp.name = "Safehouse";

    apps.push(safehouseApp);

	// Build export files
	const streams = apps.map((app) => {
        console.log(path.join(wabRoot, app.appPath, '**'));
		let stream = gulp.src(path.join(wabRoot, app.appPath, '**'))
			.pipe(zip(`${app.name}.zip`));

		paths.export.groups.forEach((group) => {
			stream = stream
				.pipe(rename((pathObj) => {
					// eslint-disable-next-line no-param-reassign
					pathObj.dirname = group.prefix;
					// eslint-disable-next-line no-param-reassign
					pathObj.basename = `${group.prefix}#${app.name}`;
					// eslint-disable-next-line no-param-reassign
					pathObj.extname = `.${group.extension}`;
				}))
				.pipe(gulp.dest(paths.export.root));
		});
		return stream;
	});

	// Merge streams and wait for completion
	return await new Promise((resolve, reject) => {
		const stream = mergeStream(...streams);
		return stream.resume().on('error', reject).on('end', resolve);
	});
});
