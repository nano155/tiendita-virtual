import { Router } from "express";
import { CartController } from "./controller";
import { CartService } from "../../service/dao/mongo/services/cart/cart.service";
import { CartRepositoryImpl } from "../../service/repositories/cart.repository-impl";
import { AuthRequired } from "../../middleware/auth-required";



export class CartRoutes{

    static get routes(){
        const router= Router()
        
        const cartService = new CartService()
        const cartRepository = new CartRepositoryImpl(cartService)
        const cartController = new CartController(cartRepository)

        router.post('/', cartController.createCart)
        router.get('/:id', cartController.getCartById)
        router.post('/:cid/products/:pid',AuthRequired.authRequired, cartController.addProductToCart)
        router.delete('/:cid/products/:pid', cartController.deleteProductToCart)
        router.delete('/:id', cartController.deleteAllProduct)
        router.put('/:cid/products/:pid', cartController.updateCartQuantity)
        router.post('/:cid/purchase', cartController.generateTicket)

        return router
    }
}