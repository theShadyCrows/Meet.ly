var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var pump = require('pump');

// GULP TASKS =======================================================
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "localhost:8888"
    // server: {
    //   baseDir: '/'
    // },
  });
});



gulp.task('useref', function(){
  return gulp.src('client/app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('client/app/**/*.js', uglify()))
    .pipe(gulp.dest('client/dist'))
});


// Gulp watch syntax
// gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
gulp.task('watch', ['browserSync', 'compress'], function () {
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/**/*.js', browserSync.reload);
  // Other watchers
  // gulp.watch('app/scss/**/*.scss', ['sass']);
});