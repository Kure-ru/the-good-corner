import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 8000;

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (req.file) {
    fs.readFile(req.file.path, (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(201).json({
        status: "success",
        filename: `http://localhost:${port}/files/${req.file?.filename}`,
      });
    });
  } else {
    return res.status(400).json({ error: "No file uploaded" });
  }
});

app.get("/files/:filename", (req: Request, res: Response) => {
  const filePath = path.join(__dirname + "/../uploads", req.params.filename);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text" });
      res.write("Fichier introuvable");
      res.end();
    }
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.write(content);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
