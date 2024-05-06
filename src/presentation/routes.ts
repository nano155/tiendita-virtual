import { Router } from "express";
import { UsersRoutes } from "./users/routes";
import { ProductRoutes } from "./products/routes";
import { CartRoutes } from "./cart/routes";


export class AppRoutes {

    static get routes(){
        const router = Router()

        router.use('/api/users', UsersRoutes.routes)
        router.use('/api/products', ProductRoutes.routes)
        router.use('/api/carts', CartRoutes.routes)

        return router
    }
}