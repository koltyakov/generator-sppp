module.exports = (function() {

    var privateConfPath = './config/_private.conf.json';
    var appConfPath = './config/app.conf.json';
    var context = {};
    try {
        context = require(privateConfPath);
    } catch (ex) {
        console.log("No private config file found");
    }
    var appConf = require(appConfPath);

    var Cpass = require("cpass");
    var cpass = new Cpass();
    var fs = require("fs");
    var path = require("path");
    var extend = require('util')._extend;
    var jsonfile = require('jsonfile');
    jsonfile.spaces = 4;
    var prompts = [];

    var preparePrompts = function(conf) {
        var promptFor = [];

        if (typeof context.clientId === "undefined") {
            var decodedPass = cpass.decode(context.password || "");
            var encodedPass = cpass.encode(decodedPass);

            conf.password = decodedPass;
            if (
                conf.siteUrl &&
                conf.username &&
                decodedPass !== encodedPass &&
                decodedPass.length > 0
            ) {
                return promptFor;
            }
            promptFor.push({
                message: "SharePoint Site Url",
                name: "siteUrl",
                type: "string",
                // required: true,
                validate: function(value) {
                    if ((value || "").length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                },
                default: conf.siteUrl || 'https://contoso.sharepoint.com'
            });
            if ((conf.siteUrl || "").indexOf(".sharepoint.com") === -1) {
                promptFor.push({
                    message: 'Domain (only for On-Premises)',
                    type: 'input',
                    name: 'domain',
                    default: conf.domain || null
                });
            }
            promptFor.push({
                message: 'User Name',
                type: 'input',
                name: 'username',
                // required: true,
                validate: function(value) {
                    if ((value || "").length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                },
                default: conf.username || null
            });
            if (decodedPass !== encodedPass && decodedPass.length > 0) {
                promptFor.push({
                    message: 'Password (keep blank to leave existing)',
                    type: 'password',
                    name: 'password',
                    // required: false
                });
            } else {
                if (typeof conf.password !== "undefined") {
                    promptFor.push({
                        message: 'Password',
                        type: 'password',
                        name: 'password',
                        // required: true,
                        validate: function(value) {
                            if ((value || "").length === 0) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    });
                }
            }
            promptFor.push({
                message: "Do you want to save config to disk?",
                name: "save",
                type: "boolean",
                default: true,
                required: true
            });
        }

        return promptFor;
    };

    var buildConfig = function(context, appConf, object, save) {
        var object = object || {};
        var context = context || object.context || {};
        var appConf = appConf || object.appConf || {};
        appConf.liveReload = appConf.liveReload || {};

        var initialPass = context.password;
        if (typeof initialPass !== "undefined") {
            var decodedPass = cpass.decode(context.password);
            var encodedPass = cpass.encode(decodedPass);
            if (initialPass === decodedPass && decodedPass.length > 100) {
                context.password = "";
            } else {
                context.password = decodedPass;
            }
            if (save && initialPass === decodedPass && (context.password || "").length > 0) {
                var _context = extend({}, context);
                _context.password = encodedPass;
                // fs.writeFile(privateConfPath, JSON.stringify(_context), "utf8", function(err) {
                jsonfile.writeFile(privateConfPath, _context, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            };
        }

        object.sppull = {
            context: context,
            options: {
                spRootFolder: appConf.spRootFolder,
                dlRootFolder: appConf.dlRootFolder
            }
        };
        object.spsave = {
            coreOptions: {
                siteUrl: context.siteUrl,
                folder: appConf.spRootFolder,
                flatten: false,
                checkin: true,
                checkinType: 1
            },
            creds: context
        };
        object.watch = {
            assets: appConf.dlRootFolder.replace("./", "") + "/**/*.*",
            base: appConf.dlRootFolder.replace("./", "")
        };
        object.liveReload = {
            siteUrl: context.siteUrl,
            protocol: appConf.liveReload.protocol || (context.siteUrl.indexOf("https://") !== -1 ? "https" : "http"),
            host: appConf.liveReload.host || "localhost",
            port: appConf.liveReload.port || 3000,
            watchBase: path.join(__dirname, appConf.dlRootFolder.replace("./", "")),
            spFolder: appConf.spRootFolder,
            ssl: {
                key: (appConf.liveReload.ssl || {}).key || path.join(__dirname, "/ssl/key.pem"),
                cert: (appConf.liveReload.ssl || {}).cert || path.join(__dirname, "/ssl/cert.crt")
            },
            creds: context
        };

        object.context = context;
        object.appConf = appConf;
        object.prompts = preparePrompts(context);

        return object;
    };

    var config = buildConfig(context, appConf, {}, true);

    config.rebuildConfig = function(res, conf) {
        conf.context.siteUrl = res.siteUrl || conf.context.siteUrl;
        conf.context.username = res.username || conf.context.username;
        if ((res.password || "").length > 0) {
            var decodedPass = cpass.decode(res.password);
            var encodedPass = cpass.encode(decodedPass);
            if (res.password === decodedPass && decodedPass.length > 100) {
                conf.context.password = "";
            } else {
                conf.context.password = decodedPass;
            }
        }
        if ((res.domain || "").length > 0) {
            conf.context.domain = res.domain;
        }
        if (res.save) {
            var _context = extend({}, conf.context);
            _context.password = cpass.encode(_context.password);
            // fs.writeFile(privateConfPath, JSON.stringify(_context), "utf8", function(err) {
            jsonfile.writeFile(privateConfPath, _context, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Config file is saved to " + privateConfPath);
            });
        }
        return buildConfig(null, null, conf, false);
    };

    return config;
})();