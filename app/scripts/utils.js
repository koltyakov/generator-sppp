"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const colors = require("colors");
class Utils {
    constructor(settings) {
        this.settings = Object.assign({}, settings);
        this.destinationRoot = this.settings.yo.destinationRoot();
        this.destinationPath = this.settings.yo.destinationPath();
    }
    writeJsonAsModuleSync(relativePath, jsonData) {
        let absolutePath = this.resolveDestPath(relativePath);
        let destinationFolder = path.dirname(absolutePath);
        mkdirp.sync(destinationFolder);
        let exists = fs.existsSync(absolutePath);
        if (!exists) {
            fs.writeFileSync(absolutePath, `module.exports = ${JSON.stringify(jsonData, null, 4)};\n`, { encoding: 'utf8' });
        }
        else {
            this.logFileExistsMessage(absolutePath);
        }
    }
    writeJsonSync(relativePath, jsonData) {
        let absolutePath = this.resolveDestPath(relativePath);
        let destinationFolder = path.dirname(absolutePath);
        mkdirp.sync(destinationFolder);
        let exists = fs.existsSync(absolutePath);
        if (!exists) {
            fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2), { encoding: 'utf8' });
        }
        else {
            this.logFileExistsMessage(absolutePath);
        }
    }
    copyFile(sourceRelativePath, destRelativePath, force = false) {
        if (typeof destRelativePath === 'undefined' || destRelativePath === null) {
            destRelativePath = sourceRelativePath;
        }
        let fromPath = this.resolveSourcePath(sourceRelativePath);
        let toPath = this.resolveDestPath(destRelativePath);
        let destinationFolder = path.dirname(toPath);
        let exists = fs.existsSync(toPath);
        if (force) {
            exists = false;
        }
        if (!exists) {
            mkdirp.sync(destinationFolder);
            fs.writeFileSync(toPath, fs.readFileSync(fromPath));
        }
        else {
            this.logFileExistsMessage(toPath);
        }
    }
    createFolder(folderRelativePath) {
        mkdirp.sync(this.resolveDestPath(folderRelativePath));
    }
    copyFolder(sourceRelativePath, destRelativePath) {
        let fromFolder = this.resolveSourcePath(sourceRelativePath);
        let toFolder = this.resolveDestPath(destRelativePath);
        this.copyRecursiveSync(fromFolder, toFolder);
    }
    resolveDestPath(relativePath) {
        return path.join(this.destinationRoot, relativePath);
    }
    resolveSourcePath(relativePath) {
        return path.join(__dirname, '..', 'templates', relativePath);
    }
    copyRecursiveSync(src, dest) {
        let exists = fs.existsSync(src);
        let stats = exists && fs.statSync(src);
        let isDirectory = exists && stats.isDirectory();
        if (exists && isDirectory) {
            mkdirp.sync(dest);
            fs.readdirSync(src).forEach((childItemName) => {
                this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            });
        }
        else {
            try {
                fs.writeFileSync(dest, fs.readFileSync(src));
            }
            catch (ex) {
                if (ex.code === 'EEXIST') {
                    this.logFileExistsMessage(dest);
                }
                else {
                    console.log(ex.message);
                }
            }
        }
    }
    logFileExistsMessage(filePath) {
        console.log(`File already exists ${colors.red(filePath)}, copying is skipped.`);
    }
}
exports.default = Utils;
