module.exports = (function() {
  var config = require('config');
  var path = require('path');
  var gulpconfig = {};
  gulpconfig.sppull = {
    options: {
        spRootFolder: config.spRootFolder,
        dlRootFolder: config.dlRootFolder
    }};
  gulpconfig.spsave = {
      coreOptions: {
          siteUrl: config.siteUrl,
          folder: config.spRootFolder,
          flatten: false,
          checkin: true,
          checkinType: 1
      }
  };
  gulpconfig.watch = {
      assets: config.dlRootFolder.replace("./", "") + "/**/*.*",
      base: config.dlRootFolder.replace("./", "")
  };
  gulpconfig.liveReload = {
      siteUrl: config.siteUrl,
      protocol: config.liveReload && config.liveReload.protocol || (config.siteUrl.indexOf("https://") !== 1 ? "https" : "http"),
      host: config.liveReload && config.liveReload.host || "localhost",
      port: config.liveReload && config.liveReload.port || 3000,
      watchBase: path.join(__dirname, config.dlRootFolder.replace("./", "")),
      spFolder: config.spRootFolder,
      ssl: {
          key: (config.liveReload && config.liveReload.ssl || {}).key || path.join(__dirname, "/ssl/key.pem"),
          cert: (config.liveReload && config.liveReload.ssl || {}).cert || path.join(__dirname, "/ssl/cert.crt")
      }
  };
  return gulpconfig;
 })();