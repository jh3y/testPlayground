var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  jade = require('gulp-jade'),
  connect = require('gulp-connect');
gulp.task('serve', function(event) {
  connect.server({
    root: "out/",
    port: 1987,
    livereload: true
  });
  // sets up a livereload that watches for any changes in the root
  watch({glob: "out/**/*.*"})
    .pipe(connect.reload());
});
gulp.task('js:publish', function(event) {
  return gulp.src("src/js/**/*.js", {base: "src/js/"})
    .pipe(gulp.dest("./"));
});
gulp.task('js:watch', function(event) {
  watch({glob: "src/js/**/*.js"}, ["js:publish"]);
});
gulp.task('jade:compile', function(event) {
  return gulp.src("src/jade/**/*.jade")
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest("out/"));
});
gulp.task('jade:watch', function(event) {
  watch({glob: "src/jade/**/*.jade"}, ['jade:compile']);
});
gulp.task('dev', ['serve', 'jade:watch', 'js:watch']);
gulp.task('default', ['dev']);
