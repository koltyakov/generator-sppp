var fs = require('fs');
var path = require('path');
var defer = require('config/defer').deferConfig;

module.exports = {
  spsave: {
    coreOptions: {
        siteUrl: defer(function (cfg) { return cfg.siteUrl }),
        folder:defer(function (cfg) { return cfg.spRootFolder }),
        flatten: false,
        checkin: true,
        checkinType: 1
      }
  },
  watch: {
    assets: defer(function (cfg) { return cfg.dlRootFolder.replace("./", "") + "/**/*.*" }),
    base: defer(function (cfg) { return cfg.dlRootFolder.replace("./", "")})
  },
  liveReload: {
    host: defer(function (cfg) { return cfg.liveReload.host || "localhost" }),
    port: defer(function (cfg) { return cfg.liveReload.port || 3000 }),
    protocol: defer(function (cfg) { return cfg.liveReload.protocol || (cfg.siteUrl.indexOf("https://") !== -1 ? "https" : "http")}),
    watchBase: defer(function (cfg) { return path.join(__dirname, cfg.dlRootFolder.replace("./", ""))}),
    ssl: {
        key: defer(function (cfg) { return (cfg.liveReload.ssl || {}).key || path.join(__dirname, "/ssl/key.pem")}),
        cert: defer(function (cfg) { return (cfg.liveReload.ssl || {}).cert || path.join(__dirname, "/ssl/cert.crt")})
    }
  }
} 
