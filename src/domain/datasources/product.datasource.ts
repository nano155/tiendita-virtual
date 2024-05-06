import { CreateProductDto } from "../dto/product-dto/create-product.dto";
import { UpdateProductDto } from "../dto/product-dto/update-product.dto";
import { PaginationDto } from "../dto/shared/pagination.dto";
import { ProductEntity } from "../entities/product.entity";


export abstract class ProductDatasource {
  abstract createProduct(productDto: CreateProductDto): Promise<ProductEntity>;
  
  abstract getProducts(paginationDto: PaginationDto): Promise<{
    products: ProductEntity[];
    page: number;
    limit: number;
    prev: string | null;
    next: string | null;
    total: number;
    totalPages: number;
  }>;
  abstract getProductById(id: string): Promise<ProductEntity>;
  abstract updateProduct(
    id: string,
    productDto: UpdateProductDto
  ): Promise<ProductEntity>;
  abstract deleteProduct(id: string): Promise<ProductEntity>;
}
