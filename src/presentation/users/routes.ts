import { Router } from "express"
import { UsersController } from "./controller"
import { UserService } from '../../service/dao/mongo/services/user/user.service';
import { UserRepositoryImpl } from "../../service/repositories/user.repository-impl";



export class UsersRoutes{

    static get routes(){
        const router = Router()

        const userService= new UserService()
        const userRepository = new UserRepositoryImpl(userService)
        const userController = new UsersController(userRepository)


        router.post('/login', userController.login)
        router.post('/register', userController.register)
        router.delete('/logout', userController.logout)
     

        return router
    }
}