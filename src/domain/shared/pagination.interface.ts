import { ProductEntity } from "../entities/product.entity";

export interface PaginatedData <T>{
    page: number | null;
    limit: number;
    total: number;
    totalPages: number;
    prev: string | null;
    next: string | null;
    products: Promise<ProductEntity[]>;
  }