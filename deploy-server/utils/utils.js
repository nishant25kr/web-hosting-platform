// import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
import {exec, spawn} from "child_process"
import { fileURLToPath } from "url";



const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});


// output/asdasd

// export async function downloadS3Folder(prefix) {
//     const allFiles = await s3.listObjectsV2({
//         Bucket: "vercel",
//         Prefix: prefix
//     }).promise();
    
//     // 
//     const allPromises = allFiles.Contents?.map(async ({Key}) => {
//         return new Promise(async (resolve) => {
//             if (!Key) {
//                 resolve("");
//                 return;
//             }
//             const finalOutputPath = path.join(__dirname, Key);
//             const outputFile = fs.createWriteStream(finalOutputPath);
//             const dirName = path.dirname(finalOutputPath);
//             if (!fs.existsSync(dirName)){
//                 fs.mkdirSync(dirName, { recursive: true });
//             }
//             s3.getObject({
//                 Bucket: "vercel",
//                 Key
//             }).createReadStream().pipe(outputFile).on("finish", () => {
//                 resolve("");
//             })
//         })
//     }) || []
//     console.log("awaiting");

//     await Promise.all(allPromises?.filter(x => x !== undefined));
// }



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function buildProject(id){
    return new Promise((resolve)=>{

        const child = exec(`cd ${path.join(__dirname, `/output/${id}`)} && npm install && npm run build`)

        child.stdout?.on("data", (data)=>{
            console.log("stdout",data)
        })

        child.stderr?.on("data", (data)=>{
            console.log("stderr",data)
        })

        child.on("close", ()=>{
            resolve()
        })
        
    })
}






export async function copyFinalDist(id) {
    const folderPath = path.join(__dirname, `output/${id}/dist`);
    const allFiles = getAllFiles(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/` + file.slice(folderPath.length + 1), file);
    })
}

const getAllFiles = (folderPath) => {
    let response = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}

const uploadFile = async (fileName, localFilePath) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}