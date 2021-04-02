import fs from 'fs';
class FileManager {
    static readRawData(file) {
        return fs.readFileSync(file);
    }
    static write(path, data) {
        try {
            fs.writeFileSync(path.toString(), data);
        }
        catch (err) {
            console.log(err);
        }
    }
    static saveFile(path, buffer) {
        fs.writeFile(path, buffer, (err) => {
            if (err) {
                throw new Error('File not saved! Something went wrong! Check the buffer data!');
            }
        });
    }
    static delete(path) {
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}
export { FileManager };
//# sourceMappingURL=FileManager.js.map