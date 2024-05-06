import { CreateProductDto, PaginationDto, UpdateProductDto } from "../dto";
import { ProductEntity } from "../entities/product.entity";




export interface ProductRepository {
  createProduct(productDto: CreateProductDto): Promise<ProductEntity>;

  getProducts(
    paginationDto: PaginationDto
  ): Promise<{
    products: ProductEntity[];
    page: number;
    limit: number;
    prev: string | null;
    next: string | null;
    total: number;
    totalPages: number;
  }>;
  getProductById(id: string): Promise<ProductEntity>;
  updateProduct(
    id: string,
    productDto: UpdateProductDto
  ): Promise<ProductEntity>;
  deleteProduct(id: string): Promise<ProductEntity>;
}
