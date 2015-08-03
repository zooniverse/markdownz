var gulp = require("gulp");
var mocha = require("gulp-mocha");
var babel = require("babel/register");

gulp.task('mocha', function() {
    return gulp.src(['t/**/*.js'])
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }));
});
