import * as Generator from 'yeoman-generator';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export interface IUtilsSettings {
    yo: Generator;
}

export default class Utils {

    private settings: IUtilsSettings;
    private destinationRoot: string;
    private destinationPath: string;

    constructor(settings: IUtilsSettings) {
        this.settings = {
            ...settings
        };
        this.destinationRoot = this.settings.yo.destinationRoot();
        this.destinationPath = this.settings.yo.destinationPath();
    }

    public writeJsonSync(relativePath: string, jsonData: any) {
        let absolutePath: string = this.resolveDestPath(relativePath);
        let destinationFolder: string = path.dirname(absolutePath);
        mkdirp.sync(destinationFolder);
        fs.writeFileSync(absolutePath, JSON.stringify(jsonData, null, 2), { encoding: 'utf8' });
    }

    public copyFile(sourceRelativePath: string, destRelativePath: string) {
        let fromPath: string = this.resolveSourcePath(sourceRelativePath);
        let toPath: string = this.resolveDestPath(destRelativePath);
        fs.writeFileSync(toPath, fs.readFileSync(fromPath));
    }

    public createFolder(folderRelativePath: string) {
        mkdirp.sync(this.resolveDestPath(folderRelativePath));
    }

    public copyFolder(sourceRelativePath: string, destRelativePath: string) {
        let fromFolder: string = this.resolveSourcePath(sourceRelativePath);
        let toFolder: string = this.resolveDestPath(destRelativePath);
        this.copyRecursiveSync(fromFolder, toFolder);
    }

    private resolveDestPath(relativePath: string): string {
        return path.join(this.destinationRoot, relativePath);
    }

    private resolveSourcePath(relativePath: string): string {
        return path.join(__dirname, 'templates', relativePath);
    }

    private copyRecursiveSync(src: string, dest: string) {
        let exists = fs.existsSync(src);
        let stats = exists && fs.statSync(src);
        let isDirectory = exists && stats.isDirectory();

        if (exists && isDirectory) {
            mkdirp.sync(dest);
            fs.readdirSync(src).forEach((childItemName) => {
                this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            });
        } else {
            fs.linkSync(src, dest);
        }
    }

}
