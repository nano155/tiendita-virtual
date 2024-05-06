import { Router } from "express";
import { ProductRepositoryImpl, ProductService } from "../../service";
import { ProductController } from "./controller";
import { AuthRequired } from "../../middleware/auth-required";





export class ProductRoutes {
    
    static get routes(){
        const router = Router()

        const productDatasource = new ProductService()
        const productRepository = new ProductRepositoryImpl(productDatasource)
        const productController = new ProductController(productRepository)


        router.post('/', AuthRequired.authRequired ,productController.createProduct)
        router.get('/', productController.getProducts )
        router.get('/:id', productController.getProductById)
        router.delete('/:id', AuthRequired.authRequired, productController.deleteProductById)
        router.put('/:id', AuthRequired.authRequired, productController.updateProductById)

        return router
    }
}