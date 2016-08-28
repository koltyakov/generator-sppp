module.exports = (function() {
    var context = require('./config/_private.conf.json');
    var appConf = require('./config/app.conf.json');

    var config = {
        sppull: {
            context: context,
            options: {
                spRootFolder: appConf.spRootFolder,
                dlRootFolder: appConf.dlRootFolder
            }
        },
        spsave: {
            siteUrl: context.siteUrl,
            username: context.username,
            domain: context.domain,
            password: context.password,
            folder: appConf.spRootFolder,
            flatten: false,
            checkin: true,
            checkinType: 1
        },
        watch: {
            assets: appConf.dlRootFolder.replace("./", "") + "/**/*.*",
            base: appConf.dlRootFolder.replace("./", "")
        }
    };
    return config;
})();