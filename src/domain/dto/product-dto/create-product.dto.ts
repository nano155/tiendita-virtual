import { Validator } from "../../../config";
import { Category } from "../../entities/product.entity";

export class CreateProductDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly code: string,
    public readonly price: number,
    public readonly status: boolean,
    public readonly stock: number,
    public readonly category: Category,
    public readonly thumbnails: [] = []
  ) {}

  static create(productDto: {
    [key: string]: any;
  }): [string?, CreateProductDto?] {
    try {
      Validator.validatorProductDataType(productDto);

      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = productDto;

      return [
        undefined,
        new CreateProductDto(
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails
        ),
      ];
    } catch (error) {
      if(error instanceof(Error)){
        return [error.message, undefined]
      }
    else{
      return ['Error unknow', undefined]
    }
    }
  }
}
