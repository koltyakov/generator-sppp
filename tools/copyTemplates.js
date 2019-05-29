//@ts-check

const copy = require('recursive-copy');

copy('./src/templates', './app/templates', {
  overwrite: true,
  dot: true
})
  .then(() => console.log('Templates has been copied'))
  .catch(console.error);