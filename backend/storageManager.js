import fs from "fs";
import path from "path";

class StorageManager {
  constructor(folderPath) {
    this.storageFolder = path.join(process.cwd(), folderPath);
    this.createStorageFolderIfNotExist();
  }

  createStorageFolderIfNotExist() {
    if (!fs.existsSync(this.storageFolder)) {
      fs.mkdirSync(this.storageFolder);
    }
  }

  emptyStorageFolder() {
    const destFolderFiles = fs.readdirSync(this.storageFolder);
    if (destFolderFiles.length > 0) {
      fs.rmSync(this.storageFolder, { recursive: true, force: true });
      fs.mkdirSync(this.storageFolder);
    }
  }

  getStorageFiles() {
    const destFolderFiles = fs.readdirSync(this.storageFolder);
    return destFolderFiles;
  }
}

export default StorageManager;
