var gulp = require('gulp');

// Gulp watch
gulp.task('watch', function() {
  gulp.watch('client/**', []);
});

//Run a local server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})