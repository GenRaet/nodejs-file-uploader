const express = require("express")
const app = express();
const FormData = require("express-form-data");
const fs = require("fs");

const port = 4848;
const fileDir = __dirname + "/files";
const tmpDir = __dirname + "/tmp";

if (!fs.existsSync(fileDir))
    fs.mkdirSync(fileDir);

if (!fs.existsSync(tmpDir))
    fs.mkdirSync(tmpDir);

var server = app.listen(port, function () {
    console.info(`ポート番号${port}でホストされています`);
});

app.use(FormData.parse({ uploadDir: __dirname + "/tmp", autoClean: true }));
app.use(express.static("public"))

app.post("/api/upload", (req, res) => {
    console.log(`リクエストを受信しました リモートアドレス ${req.ip}`);
    const n = req.files.image.length;
    for (let i = 0; i < n; i++) {
        let src = req.files.image[i].path;
        let name = req.files.image[i].name;
        fs.renameSync(src, fileDir + "/" + name);
        console.log(`The file have been uploaded. File Name: ${name}`);
    }
    res.redirect("/");
})