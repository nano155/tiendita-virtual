import { Request, Response } from "express";

import { ProductService } from "../../service/dao/filesystem/service/product.service";

export class ProductController {
  constructor(
   
    private readonly productServiceFile: ProductService
  ) {}

 
  public getProductsFs = (req:Request, res:Response) => {
    const products = this.productServiceFile.getProducts();
    res.json({ Payload: products });
  };
}