//@ts-check

const { customDataLoader } = require('sp-build-tasks');

// Load custom data object, which is passed to templates

module.exports = customDataLoader((buildSettings, configs) => {
  return new Promise(resolve => {
    const customData = { muData: 'my-data' };
    resolve(customData);
  });
});

// module.exports = (buildSettings, configs) => {
//   const customData = {};
//   return Promise.resolve(customData);
// };
