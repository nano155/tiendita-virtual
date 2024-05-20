import { NextFunction, Request, Response } from "express";
import { commandInstance, devLoggerInstance, prodLoggerInstance } from "../config";




export class LoggerApp {


    

      

    static addLogger = (req:Request, res:Response, next:NextFunction) =>{

        if(commandInstance === 'production'){
            console.log('production');
            
            req.logger = prodLoggerInstance
            req.logger.error(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.warning(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.http(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.debug(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
        }else{
            req.logger = devLoggerInstance
            req.logger.error(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.warning(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.http(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    
            req.logger.debug(`${req.method} en ${req.url}- at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)

        }


        next()
    }
}