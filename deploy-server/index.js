import { createClient} from "redis";
import { buildProject, copyFinalDist, } from "./utils/utils.js";

const subscriber = createClient();

async function main(){
    
    await subscriber.connect()
    
    while(true){
        const response = await subscriber.brPop(
            "build-queue",
            0
        )
        console.log(response)
        const id = response.element
        await downloadeS3(`/output/${response.element}`)
        await buildProject(id)

        await copyFinalDist(id)
    }

}

main()
