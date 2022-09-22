import Express from "express";
import FormData from "express-form-data";
import path from "path";
import sharp from "sharp";

const rootPath = path.dirname(process.argv[1]);
const fileDir = path.join(rootPath, "files");

const router = Express.Router();

router.use(FormData.parse({ uploadDir: path.join(rootPath, "tmp"), autoClean: true }));

router.post("/upload", (req, res) => {
    console.log(`リクエストを受信しました リモートアドレス ${req.ip}`);
    const n = req.files.image.length;
    for (let i = 0; i < n; i++) {
        let src = req.files.image[i].path;
        let name = req.files.image[i].name;
        sharp(src)
            .webp({ quality: 100 })
            .toFile(fileDir + "/" + path.basename(name) + ".webp");
        console.log(`The file have been uploaded. File Name: ${name}`);
    }
    res.redirect("/");
})

router.get("/all", (req, res) => {
    const all = fs.readdirSync(path.join(rootPath, "files"));
    res.json(all);
})

router.get("/reader", (req, res) => {
    if (!req.query["filename"])
        return;
    const fileStream = fs.createReadStream(path.join(rootPath, "files", req.query["filename"]));
    fileStream.pipe(res);
})

router.get("/clear", (req, res) => {
    const all = fs.readdirSync(path.join(rootPath, "files"));
    all.forEach(v => fs.unlink(path.join(rootPath, "/files/", v), (err) => { throw err; }));
})

router.get("/convert-to-webp", (req, res) => {

})

export default router;