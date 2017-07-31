var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//相当于自动载入了所有的gulp插件gulp-connect。。。。
var open = require('open');

var app = {
  srcPath: 'src/',
  devPath: 'build/',
  prdPath: 'dist/'
};

gulp.task('lib', function() {
  gulp.src('bower_components/**/*.js')//abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
  .pipe(gulp.dest(app.devPath + 'vendor'))//生成拷贝来的文件
  .pipe(gulp.dest(app.prdPath + 'vendor'))
  .pipe($.connect.reload());//自动刷新浏览器进行预览
});
gulp.task('libcss', function() {
  gulp.src('bower_components/**/*.css')//abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件
  .pipe(gulp.dest(app.devPath + 'vendor'))//生成拷贝来的文件
  .pipe(gulp.dest(app.prdPath + 'vendor'))
  .pipe($.connect.reload());//自动刷新浏览器进行预览
});


gulp.task('html', function() {
  gulp.src(app.srcPath + '**/*.html')
  .pipe(gulp.dest(app.devPath))
  .pipe(gulp.dest(app.prdPath))
  .pipe($.connect.reload());
})


gulp.task('json', function() {
  gulp.src(app.srcPath + 'data/**/*.json')
  .pipe(gulp.dest(app.devPath + 'data'))
  .pipe(gulp.dest(app.prdPath + 'data'))
  .pipe($.connect.reload());
});

gulp.task('less', function() {
  gulp.src(app.srcPath + 'style/index.less')
  .pipe($.plumber())
  .pipe($.less())//编译less成CSS
  .pipe(gulp.dest(app.devPath + 'css'))
  .pipe($.cssmin())
  .pipe(gulp.dest(app.prdPath + 'css'))
  .pipe($.connect.reload());
});

gulp.task('js', function() {
  gulp.src(app.srcPath + 'script/**/*.js')
  .pipe($.plumber())
  .pipe($.concat('index.js'))//合并文件成JS
  .pipe(gulp.dest(app.devPath + 'js'))
  .pipe($.uglify())
  .pipe(gulp.dest(app.prdPath + 'js'))
  .pipe($.connect.reload());
});

gulp.task('image', function() {
  gulp.src(app.srcPath + 'image/**/*')
  .pipe($.plumber())
  .pipe(gulp.dest(app.devPath + 'image'))
  .pipe($.imagemin())
  .pipe(gulp.dest(app.prdPath + 'image'))
  .pipe($.connect.reload());
});

gulp.task('build', ['image', 'js', 'less', 'lib', 'libcss','html', 'json']);

gulp.task('clean', function() {//每次发布前，会清楚之前的那次文件
  gulp.src([app.devPath, app.prdPath])
  .pipe($.clean());
});

gulp.task('serve', ['build'], function() {//build进行编译
  $.connect.server({
    root: [app.devPath],
    livereload: true,//自动刷新
    port: 3000
  });

  open('http://localhost:3000');

  gulp.watch('bower_components/**/*', ['lib']);
  gulp.watch('bower_components/**/*', ['libcss']);
  gulp.watch(app.srcPath + '**/*.html', ['html']);//修改文件的时候，就会自动执行对应的构建任务
  gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
  gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'image/**/*', ['image']);
});

gulp.task('default', ['serve']);
