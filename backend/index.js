import express from 'express';
import multer from 'multer';

const app = express();
const port = 8080;

const storage = multer.memoryStorage(); // No disk writing
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);    
})