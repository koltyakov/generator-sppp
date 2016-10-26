module.exports = (function() {
    var context = require('./config/_private.conf.json');
    var appConf = require('./config/app.conf.json');

    var Cpass = require("cpass");
    var cpass = new Cpass();

    context.password = cpass.decode(context.password);

    var config = {
        sppull: {
            context: context,
            options: {
                spRootFolder: appConf.spRootFolder,
                dlRootFolder: appConf.dlRootFolder
            }
        },
        spsave: {
            coreOptions: {
                siteUrl: context.siteUrl,
                folder: appConf.spRootFolder,
                flatten: false,
                checkin: true,
                checkinType: 1
            },
            creds: context
        },
        watch: {
            assets: appConf.dlRootFolder.replace("./", "") + "/**/*.*",
            base: appConf.dlRootFolder.replace("./", "")
        }
    };



    return config;
})();