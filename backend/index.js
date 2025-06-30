import path from 'path';

import express from "express";
import multer from "multer";

import StorageManager from "./storageManager.js";

const app = express();
const port = 8080;

const storageFolderName = "storage";
const storageManager = new StorageManager(storageFolderName);
const storageFolder = storageManager.storageFolder;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    storageManager.emptyStorageFolder();
    cb(null, storageFolder);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`/${storageFolderName}`, express.static(storageFolderName));


app.post("/api/upload", upload.single("image"), (req, res) => {
  console.log("File received:", req.file);
  const fileUrl = `${req.protocol}://${req.get('host')}/${storageFolderName}/${req.file.filename}`;
  res.json({ message: "File uploaded successfully", file: {...req.file, url: fileUrl} });
});

app.get("/api/download", (req, res) => {
    const filePath = storageFolder + "/" + storageManager.getStorageFiles()[0];
    const fileName = path.basename(filePath)
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.sendFile(filePath);
});



app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
