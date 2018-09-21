//@ts-check

const { customTask } = require('sp-build-tasks');

module.exports = customTask((gulp, $, settings) => {

  gulp.task('example', cb => {
    console.log('Example Gulp Task');
    cb();
  });

});

// module.exports = (gulp, $, settings) => {
//   gulp.task('example', cb => {
//     console.log('Example Gulp Task');
//     cb();
//   });
// };
