import { Command } from 'commander';
import dotenv from 'dotenv';



export class Commands {

    static get create(){

        const program = new Command()

        program.option('--mode <mode>', 'Modo de trabajo', 'develop')

        program.parse(process.argv)

        console.log(`Mode options: ${program.opts().mode}`);
        

        const enviroment = program.opts().mode;

        dotenv.config({
            path:enviroment === 'production'?'./src/config/.env.production':'./src/config/.env.develoment'
        })

        return enviroment

    }
} 

export const commandInstance = Commands.create