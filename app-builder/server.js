const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("appfile"), (req, res) => {
  res.json({ success: true });
});

app.get("/apps", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    res.json(files);
  });
});

app.delete("/delete/:name", (req, res) => {
  const filePath = path.join("uploads", req.params.name);
  fs.unlink(filePath, () => {
    res.json({ deleted: true });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
