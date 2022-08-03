const {src, parallel, series, dest, watch: gulpWatch} = require('gulp');
const del = require('del');
const webpackSteam = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const yargs = require('yargs');
const rename = require("gulp-rename");
const replace = require('gulp-replace');

const isProduction = (yargs.argv.production !== undefined);
const version = process.env.npm_package_version;

// config

const scr = "src/";
const dist = "dist/"

const paths = {
	htmlSrcAll: scr + '*.html',
	htmlSrc: scr + '*.html',
	htmlDist: dist + "",

	pdfSrcAll: scr + '*.pdf',
	pdfSrc: scr + '*.pdf',
	pdfDist: dist + "",

	faviconSrcAll: scr + 'favicon/**/*',
	faviconSrc: scr + 'favicon/**/*',
	faviconDist: dist + '/',

	imgSrcAll: scr + 'img/**/*',
	imgSrc: scr + 'img/**/*',
	imgDist: dist + 'img/',

	fontsSrcAll: scr + 'fonts/**/*',
	fontsSrc: scr + 'fonts/**/*',
	fontsDist: dist + 'fonts/',

	scssSrcAll: scr + 'css/**/*.scss',
	scssSrc: scr + 'css/*.scss',
	cssDist: dist + 'css/',

	jsSrcAll: scr + 'js/**/*.js',
	jsSrc: scr + 'js/index.js',
	jsDist: dist + 'js/',
}

// builders

const html = () => {
	return src(paths.htmlSrc)
	.pipe(replace("{{version}}", version))
	.pipe(dest(paths.htmlDist));
};

const pdf = () => {
	return src(paths.pdfSrc).pipe(dest(paths.pdfDist));
};

const favicon = () => {
	return src(paths.faviconSrc).pipe(dest(paths.faviconDist));
};

const img = () => {
	return src(paths.imgSrc).pipe(dest(paths.imgDist));
};

const fonts = () => {
	return src(paths.fontsSrc).pipe(dest(paths.fontsDist));
};

const scss = () => {
	return src(paths.scssSrc)
	.pipe(sass().on('error', sass.logError))
	.pipe(rename({
		suffix: "" + version,
	}))
	.pipe(dest(paths.cssDist));
};

const js = () => {
	return src(paths.jsSrc)
	.pipe(
		webpackSteam({
			mode: isProduction ? "production" : "development",
			devtool: isProduction ?  undefined : 'source-map',
			module: {
				rules: [
					{
						test: require('path').resolve(__dirname, 'node_modules/leader-line/'),
						use: [{
							loader: 'skeleton-loader',
							options: {procedure: content => `${content}; export default LeaderLine`}
						}]
					}
				],
			},
		}),
	)
	.pipe(rename({
		suffix: "" + version,
	}))
	.pipe(dest(paths.jsDist));
};

// public

const clean = (cb) => {
	del(['./dist/**'], {force: true});
	cb();
};

const build = series(clean, parallel(html, pdf, favicon, img, fonts, scss, js));

const watch = series(build, (cb) => {
	gulpWatch(paths.pdfSrcAll, pdf);
	gulpWatch(paths.htmlSrcAll, html);
	gulpWatch(paths.imgSrcAll, img);
	gulpWatch(paths.fontsSrcAll, fonts);
	gulpWatch(paths.scssSrcAll, scss);
	gulpWatch(paths.jsSrcAll, js);
	cb();
});

exports.watch = watch;
exports.clean = clean;
exports.build = build;