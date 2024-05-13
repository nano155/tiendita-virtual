import { Router } from "express";
import { UsersRoutes } from "./users/routes";
import { ProductRoutes } from "./products/routes";
import { CartRoutes } from "./cart/routes";
import { ProductService } from "../service/dao/filesystem/service/product.service";
import { ProductController } from "./products/controller-fs";


export class AppRoutes {

    static get routes(){
        const router = Router()
        const productService = new ProductService()
        const productController = new ProductController(productService)

        router.use('/api/users', UsersRoutes.routes)
        router.use('/api/products', ProductRoutes.routes)
        router.use('/api/carts', CartRoutes.routes)
        router.get('/mockingproducts', productController.getProductsFs)

        return router
    }
}