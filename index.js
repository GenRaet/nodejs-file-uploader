import Express from "express";
const app = Express();
import fs from "fs";
import path from "path";

import apiRoute from "./api.js";

const rootPath = path.dirname(process.argv[1]);

const port = 4848;
const fileDir = path.join(rootPath, "files");
const tmpDir = path.join(rootPath, "tmp");

if (!fs.existsSync(fileDir))
    fs.mkdirSync(fileDir);

if (!fs.existsSync(tmpDir))
    fs.mkdirSync(tmpDir);

const server = app.listen(port, function () {
    console.info(`ポート番号${port}でホストされています`);
});

app.use(Express.static("public"))

app.get("/view", (req, res) => {
    res.sendFile(path.join(rootPath, "public", "view.html"));
})

app.use("/api", apiRoute)

server.addListener("error", (err) => {
    console.error(err);
    throw err;
})