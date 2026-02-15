import express, { json } from "express"
import cors from "cors"
import { generate } from "./utils/utils.js"
import simpleGit from "simple-git"
import path from "path"
// import { getAllFiles } from "./utils/utils.js"
// import { uploadeOnS3 } from "./utils/utils.js"
import { fileURLToPath } from "url";
import { createClient } from "redis"

const app = express()
app.use(express.json())
app.use(cors())

const publisher = createClient()
await publisher.connect()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.post("/deploye", async (req, res) => {

    const { url } = req.body
    const id = generate()
    console.log(url)

    // await simpleGit().clone(url, path.join(__dirname, `output/${id}`))

    // const files = getAllFiles(path.join(__dirname, `output/0e3b3`));

    // files.forEach(async file => {
    //     await uploadeOnS3(file.slice(__dirname.length + 1), file);

    // })

    publisher.lPush("build-queue",id);

    res.json({
        id: id
    })

});

const PORT = 3000

app.listen(PORT, () => {
    console.log("app is running")
})