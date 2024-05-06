import { CreateProductDto, PaginationDto, ProductDatasource, ProductEntity, ProductRepository, UpdateProductDto } from "../../domain";


export class ProductRepositoryImpl implements ProductRepository {
  constructor(public readonly productService: ProductDatasource) {}

  createProduct(productDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(productDto);
  }
  getProducts(paginationDto: PaginationDto): Promise<{ products: ProductEntity[]; page: number; limit: number; prev: string | null; next: string | null; total: number; totalPages: number; }> {
    return this.productService.getProducts(paginationDto);
  }
  getProductById(id: string): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }
  updateProduct(id: string, productDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productService.updateProduct(id, productDto)
  }
  deleteProduct(id: string): Promise<ProductEntity> {
    return this.productService.deleteProduct(id);
  } 
}
