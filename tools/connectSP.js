//@ts-check

const { AuthConfig } = require('node-sp-auth-config');

(async () => {

  const ctx = await new AuthConfig().getContext();

})()
  .catch(console.error);
