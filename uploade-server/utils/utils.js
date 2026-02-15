import fs from "fs"
import path from "path"
import { S3Client } from "@aws-sdk/client-s3";

const MAX_LEN = 5

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export function generate() {
    let ans = ""
    const subset = "123456778990aldflaoqpueriunmcbzxcdafdf"
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)]
    }
    return ans;
}

export function getAllFiles(folderPath) {
    let response = [];
    const allFilesAndFolders = fs.readdirSync(folderPath);
     
    allFilesAndFolders.forEach(file => {
        
        const fullFilePath = path.join(folderPath, file);
        
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }

    });

    return response;

}

// export async function uploadeOnS3(fileName, localFilePath) {
//     const fileContent = fs.readFileSync(localFilePath)

//     const res = await s3.upload({
//         Body: fileContent,
//         Bucket: "vercel",
//         Key: fileName,
//     }).promise();
//     console.log(response);

// }

