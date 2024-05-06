import { envs } from "./config/envs"
import { MongoConnect } from "./service/dao/mongo/mongo-connect"
import { ServerApp } from "./presentation/server"
import { AppRoutes } from "./presentation/routes"



(()=>{

    main()
})()

async function main(){
    const server = new ServerApp({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
    
    
    await MongoConnect.connect({mongo_url:envs.URL, db_name: envs.DB_NAME})

    server.start()
    
}