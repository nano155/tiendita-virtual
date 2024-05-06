import { CreateTicket } from "../dto";
import { TicketEntity } from "../entities";
import { CartEntity } from "../entities/cart.entity";

export abstract class CartDatasource {

    abstract createCart():Promise<CartEntity>
    abstract getCartByid(id:string):Promise<CartEntity>
    abstract addProductToCart(cid:string, pid:string):Promise<CartEntity>
    abstract deleteProductToCart(cid:string, pid: string):Promise<CartEntity>
    abstract deleteAllProduct(id:string):Promise<CartEntity>
    abstract updateCartQuantity(cid:string, pid:string, quantity:number):Promise<CartEntity>
    abstract generateTicket(ticket:CreateTicket):Promise<TicketEntity>

}