import express, { Router }  from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { LoggerApp } from '../middleware/add-logger';

interface Options  {

    port:number;
    routes: Router;
    public_path?: string;
}

export class ServerApp {

    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly public_path: string;

    constructor(options: Options){
        const {port, routes, public_path = 'public'} = options
        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
    }

    async start(){

        this.app.use(cors({
            origin: 'http://127.0.0.1:5173'
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())

        this.app.use(LoggerApp.addLogger)

        this.app.use(express.static(this.public_path))
        this.app.use(this.routes)

        this.app.get('/logger' , (req, res) =>{
            req.logger?.warning('Mensaje de prueba log en un endpoint: /logger')
            res.send('prueba logger')
        })

        this.app.listen(this.port, ()=>{
            console.log(`listen port ${this.port}`);
            
        })
        
    }
}