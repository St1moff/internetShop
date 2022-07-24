const {src, dest, series, watch, parallel} = require('gulp')
const Sass = require('gulp-sass')(require('sass'))
const Pug = require('gulp-pug')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const plumber = require('gulp-plumber');



function fonts () {
	return src('src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts/'))
}

const checkWeight = (fontname) => {
  let weight = 400;
  switch (true) {
    case /Thin/.test(fontname):
      weight = 100;
      break;
    case /ExtraLight/.test(fontname):
      weight = 200;
      break;
    case /Light/.test(fontname):
      weight = 300;
      break;
    case /Regular/.test(fontname):
      weight = 400;
      break;
    case /Medium/.test(fontname):
      weight = 500;
      break;
    case /SemiBold/.test(fontname):
      weight = 600;
      break;
    case /Semi/.test(fontname):
      weight = 600;
      break;
    case /Bold/.test(fontname):
      weight = 700;
      break;
    case /ExtraBold/.test(fontname):
      weight = 800;
      break;
    case /Heavy/.test(fontname):
      weight = 700;
      break;
    case /Black/.test(fontname):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
}

const cb = () => {}

let srcFonts = './src/sass/_fonts.sass';
let appFonts = './app/fonts/';

const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

        if (c_fontname != fontname) {
          fs.appendFile(srcFonts, '@include font-face("' + font + '", "' + fontname + '", ' + weight +')\r\n', cb);
        }
        c_fontname = fontname;
      }
    }
  })

  done();
}


function pug() {
  return src('src/*.pug')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe(Pug())
  .pipe(dest('app'))
}


function html() {
  return src('src/*.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('app'))
}  

async function sass() {
  return await setTimeout(() => {
    src('src/sass/**.sass')
      .pipe(sourcemaps.init())
      .pipe(Sass()).on('error', notify.onError())
      .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('app'))
  }, 0)
} 

function imgToApp() {
  return src(['src/img/**.jpg', 'src/img/**.png', 'src/img/**.jpeg'])
  .pipe(dest('app/img'))
}

function svgSprites() {
  return src(['src/img/svg/**.svg'])
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../sprite.svg"
      }
    }
  }))
  .pipe(dest('app/img'))
}

function resources () {
	return src('./src/resources/**')
		.pipe(dest('./app/resources'))
}

function scripts () {
	return src('src/js/main.js')
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }}]
        },
      }))
      .on('error', function (err) {
        console.error('WEBPACK ERROR', err);
        this.emit('end'); // Don't stop the rest of the task
      })
		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/js'))

}
function vendorJS() {
  const modules = [
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/swiper/swiper-bundle.min.js.map',
  ];

  return src(modules)
    .pipe(dest('app/vendorFiles'));
};

function vendorCSS() {
  const modules = [
    'node_modules/swiper/swiper-bundle.min.css',
  ];

  return src(modules)
    .pipe(dest('app/vendorFiles'));
};
function clear() {
  return del('app')
}

function serve() {
  sync.init({
    server: './app'
  })

  watch('src/fonts/**.ttf', series(fonts)).on('change', sync.reload)
  watch('src/fonts/**.ttf', series(fontsStyle)).on('change', sync.reload)
  watch('src/img/**.jpg', series(imgToApp)).on('change', sync.reload)
  watch('src/img/**.png', series(imgToApp)).on('change', sync.reload)
  watch('src/img/**.jpeg', series(imgToApp)).on('change', sync.reload)
  watch('src/img/svg/**.svg', series(svgSprites)).on('change', sync.reload)
  watch('src/resources/**', series(resources)).on('change', sync.reload)
  watch('src/*.pug', series(pug)).on('change', sync.reload)
  watch('src/parts/*.html', series(pug)).on('change', sync.reload)
  watch('src/sass/components/**.sass', series(sass)).on('change', sync.reload)
  watch('src/parts/*.pug', series(pug)).on('change', sync.reload)
  watch('src/**.html', series(html)).on('change', sync.reload)
  watch('src/sass/**.sass', series(sass)).on('change', sync.reload)
  watch('src/js/**/*.js', series(scripts)).on('change', sync.reload)
}

exports.pug = pug
exports.imgToApp = imgToApp
exports.svgSprites = svgSprites
exports.sass = sass
exports.html = html
exports.scripts = scripts
exports.serve = series(clear, parallel(pug, scripts, fonts, resources, imgToApp, svgSprites, vendorJS, vendorCSS), fontsStyle, sass, serve);
exports.clear = clear



//Build
async function sassBuild() {
  return await setTimeout(() => {
    src('src/sass/**.sass')
      .pipe(Sass()).on('error', notify.onError())
      .pipe(autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 2 versions']
      }))
//      .pipe(csso())    // сжимает код
      .pipe(dest('app'))
  }, 0)
} 

function scriptsBuild () {
	return src('src/js/main.js')
		.pipe(webpackStream({
			mode: 'production',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on("error", function (err) {
			console.log('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})
		.pipe(uglify().on("error", notify.onError())) //не дает прочитать код
		.pipe(dest('app/js'))

}



exports.build = series(clear, parallel(pug, scriptsBuild, fonts, resources, imgToApp, svgSprites, vendorJS, vendorCSS), fontsStyle, sassBuild);



// deploy Hosting
const deploy = () => {
	let conn = ftp.create({
		host: '',
		user: '',
		password: '',
		parallel: 10,
		log: gutil.log
	});

	let globs = [
		'app/**',
	];

	return src(globs, {
			base: './app',
			buffer: false
		})
		.pipe(conn.newer('')) // only upload newer files
		.pipe(conn.dest(''));
}

exports.deploy = deploy;
  