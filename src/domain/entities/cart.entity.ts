

export class CartEntity {
  id: string;
  products: { quantity: number; productId: string }[]; // Almacenamos solo el ID del producto

  constructor(id: string, products: { quantity: number; productId: string }[]) {
    this.id = id;
    this.products = products;
  }

  static fromObject(cart: { id: string; products?: any[] }): CartEntity {
    const { id, products = [] } = cart;
    return new CartEntity(id, products);
  }
}

// export class CartEntity {
//   id: string;
//   products: { quantity: number; product: any }[]; // Aquí mantenemos el producto completo

//   constructor(id: string, products: { quantity: number; product: any }[]) {
//     this.id = id;
//     this.products = products;
//   }

//   static fromObject(cart: { id: string; products?: any[] }): CartEntity {
//     const { id, products = [] } = cart;

//     const convertedProducts = products.map((productItem: any) => ({
//       quantity: productItem.quantity,
//       product: productItem.product ? productItem.product.toObject() : null, // Convertir la referencia de producto a un objeto plano
//     }));

//     return new CartEntity(id, convertedProducts);
//   }
// }
