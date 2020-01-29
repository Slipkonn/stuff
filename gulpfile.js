var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var plumber 		 = require('gulp-plumber');

gulp.task('browserSync', function(done) { 
  browserSync.init({
    server: {
      baseDir: './ecommerce'
    },
    notify: false
  });
  
  browserSync.watch('ecommerce/').on('change', browserSync.reload);
  
  done()
});	

gulp.task('sass', function(done){
  gulp.src('ecommerce/sass/*.sass')
    .pipe(plumber({
      errorHandler : function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({errLogToConsole: true}))
    .pipe(sass({outputStyle: 'compact'}))
    .pipe(autoprefixer({
      cascade: false
    }))
   .pipe(gulp.dest('ecommerce/css/'))
   .pipe(browserSync.reload({stream: true}));
  
  done()
});

gulp.task('watch', gulp.series('sass', 'browserSync', function(done) {
  gulp.watch('ecommerce/**/*.*', gulp.series('sass'));
  
  done()
}));