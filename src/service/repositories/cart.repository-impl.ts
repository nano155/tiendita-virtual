import { CartDatasource, CartEntity, CartRepository, CreateTicket, TicketEntity } from "../../domain";


export class CartRepositoryImpl implements CartRepository {

    constructor(
        private readonly cartService:CartDatasource
    ){}
    generateTicket(ticket: CreateTicket): Promise<TicketEntity> {
        return this.cartService.generateTicket(ticket)
    }
    createCart(): Promise<CartEntity> {
       return this.cartService.createCart()
    }
    getCartByid(id: string): Promise<CartEntity> {
        return this.cartService.getCartByid(id)
    }
    addProductToCart(cid: string, pid: string): Promise<CartEntity> {
        return this.cartService.addProductToCart(cid, pid)
    }
    deleteProductToCart(cid: string, pid: string): Promise<CartEntity> {
        return this.cartService.deleteProductToCart(cid, pid)
    }
    deleteAllProduct(id: string): Promise<CartEntity> {
        return this.cartService.deleteAllProduct(id)
    }
    updateCartQuantity(cid: string, pid: string, quantity: number): Promise<CartEntity> {
        return this.cartService.updateCartQuantity(pid, cid, quantity)
    }

}