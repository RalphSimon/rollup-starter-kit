"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const eslint = require('rollup-plugin-eslint');
const rollupBabel = require('rollup-plugin-babel');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/assets'))
    .pipe(browserSync.stream());
});

gulp.task('rollup', () => {
  return rollup.rollup({
    entry: './src/scripts/index.js',
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      eslint({
        exclude: [
          './src/scss/**'
        ]
      }),
      rollupBabel({
        exclude: 'node_modules/**'
      })
    ]
  }).then(function (bundle) {
    bundle.write({
      format: 'iife',
      dest: './src/assets/bundle.js'
    });
  });
});

gulp.task('watch-rollup', ['rollup'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('serve', ['sass'], function () {

  browserSync.init({
    open: false,
    server: './src'
  });

  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['watch-rollup']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
