import { CreateProductDto, PaginationDto, ProductDatasource, ProductEntity, UpdateProductDto } from "../../../../../domain";
import { productModel } from "../../models/product.model";


export class ProductService implements ProductDatasource {


  async createProduct(productDto: CreateProductDto): Promise<ProductEntity> {
    const ProductsExist = await productModel.findOne({title: productDto.title})
    if(ProductsExist) throw new Error('Product already exist')
      const codeExist = await productModel.findOne({code: productDto.code})
    if(codeExist) throw new Error('code already exist')
    try {
      const newProduct = new productModel(productDto);
      const productSaved = await newProduct.save();
      
      return ProductEntity.fromObject(productSaved);
    } catch (error) {
      throw Error(`Internal error ${error}`);
    }
  }
  
  async getProducts(paginationDto: PaginationDto): Promise<{ products: ProductEntity[]; page: number, limit:number, prev:string|null, next:string|null, total: number; totalPages: number; }> {
    const { limit, page, sort } = paginationDto;

      let query = productModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (sort === "asc" || sort === "desc") {
        query = query.sort({ price: sort === "asc" ? 1 : -1 });
      }
      try {
        const [total, products] = await Promise.all([
          productModel.countDocuments(),
          query.exec(),
        ]);
        const totalPages = Math.ceil(total / limit);
        const prev =
          page - 1 > 0 && page -1 <= totalPages
            ? `/api/products?page=${page - 1}&limit=${limit}`
            : null;
        const next =
          page + 1 > totalPages
            ? null
            : `/api/products?page=${page + 1}&limit=${limit}`;

        const productEntities = products.map((product) => ProductEntity.fromObject(product));

        return {
          page: page,
          limit: limit,
          total: total,
          totalPages: totalPages,
          prev: prev,
          next: next,
          products: productEntities,
        };
      } catch (error) {
        throw new Error(`Internal error: ${error}`);
      }
  }
  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const product = await productModel.findById(id);
      if (!product)
        throw new Error(`No se encontro ningun producto con el ID ${id}`);

      return ProductEntity.fromObject(product);
    } catch (error) {
      throw Error(`Internal error ${error}`);
    }
  }
  async updateProduct(
    id: string,
    productDto: UpdateProductDto
  ): Promise<ProductEntity> {
    try {
      const updateProduct = await productModel.findByIdAndUpdate(
        id,
        productDto,
        { new: true }
      );
      if (!updateProduct)
        throw new Error(`No se encontro ningun producto con el ID ${id}`);

      return ProductEntity.fromObject(updateProduct);
    } catch (error) {
      throw Error(`Internal error ${error}`);
    }
  }
  async deleteProduct(id: string): Promise<ProductEntity> {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(id);
      if (!deletedProduct)
        throw new Error(`No se encontro ningun producto con el ID ${id}`);

      return ProductEntity.fromObject(deletedProduct);
    } catch (error) {
      throw Error(`Internal error ${error}`);
    }
  }
}
