module.exports = (function() {
    var config = require('config');
    var Cpass = require("cpass");
    var cpass = new Cpass();
    config.password = cpass.decode(config.password || "");
    
    config.validateLocalConfig = function() {
        var prompt = require("gulp-prompt");
        var through = require("through2");
        var fs = require('fs');
        var path = require('path');

        var localConfig = {};
        try
        {
            require("./config/local.json");
        }
        catch (ex)
        {
            console.log("Couldn't load configuration file local.yaml. Answer the following questions to generate:");
            config.localConfigPrompts.forEach(function(src){
                if (src.type != "password" && localConfig[src.name])
                    src.default = localConfig[src.name];
            });
            return prompt.prompt(config.localConfigPrompts, function(res) {
                config.localConfigPrompts.forEach(function(src){
                    if (src.type == "password")
                        res[src.name] = cpass.encode(res[src.name]);
                });
                fs.writeFileSync("./config/local.json", JSON.stringify(res), 'utf8');
            });
        }
        return through.obj();
    }

    return config;
})();