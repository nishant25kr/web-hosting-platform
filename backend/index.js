import express from "express"
import cors from "cors"
const app= express()
app.use(cors())



app.post("/deploye",async(req,res)=>{

    const url = req.body

    

    console.log(url)
    req.json({message: url})



})

const PORT = 3000

app.listen(PORT,() => {
    console.log("app is running")
})