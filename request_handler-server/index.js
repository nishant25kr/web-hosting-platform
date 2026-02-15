import express from "express"

const app = express()
const PORT = 3001

app.get("/*", async (req,res)=>{
    const {host } = req.hostname
    const id = host.split(".")[0]

    const filepath = req.path

    const content = await s3.getObject({
        Bucket: vercel,
        key: `dist/${id}/${filepath}`

    }).promise()

    res.send(content.body);
})

app.listen(PORT,()=>{
    console.log("server of request handler is running")
})