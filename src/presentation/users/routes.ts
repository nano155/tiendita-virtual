import { Router } from "express"
import { UsersController } from "./controller"
import { UserService } from '../../service/dao/mongo/services/user/user.service';
import { UserRepositoryImpl } from "../../service/repositories/user.repository-impl";
import { EmailService } from '../../service/dao/mongo/services/email/email.service';
import { envs } from "../../config";



export class UsersRoutes{

    static get routes(){
        const router = Router()

        const emailService = new EmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET )
        const userService= new UserService(emailService)
        const userRepository = new UserRepositoryImpl(userService)
        const userController = new UsersController(userRepository)


        router.post('/login', userController.login)
        router.post('/register', userController.register)
        router.delete('/logout', userController.logout)
        router.get('/validate-email/:token' , userController.validateEmail)
     

        return router
    }
}