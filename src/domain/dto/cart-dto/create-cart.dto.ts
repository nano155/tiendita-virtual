
import { CartEntity } from "../../entities/cart.entity";

export class CreateCartDto {
  constructor(
    public readonly products: Array<{ quantity: number; productId?: string }> = [],
  ) {}

  static fromEntity(cart: CartEntity): CreateCartDto {
    return new CreateCartDto(
      cart.products.map((product) => ({ quantity: product.quantity, productId: product.product?.toString() }))
    );
  }
}