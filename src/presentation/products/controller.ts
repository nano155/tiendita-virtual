import { Request, Response } from "express";
import {
  CreateProductDto,
  CustomError,
  Eerrors,
  PaginationDto,
  ProductRepository,
  Role,
  UpdateProductDto,
} from "../../domain";
import { AuthenticatedRequest } from "../../middleware/auth-required";

export class ProductController {
  constructor(public readonly productRepository: ProductRepository) {}

  public createProduct = (req: AuthenticatedRequest, res: Response) => {
    const userAuthorized = req.user?.payload.role;
    if (userAuthorized !== Role.admin)
      return res.status(401).json({ message: "Unauthorized operation" });

    const [error, createDto] = CreateProductDto.create(req.body);

    if (error) {
        CustomError.createError({
        name: "Create product error",
        cause: error,
        message: "Missing Data",
        code: Eerrors.DATABASE_ERROR,
      });

      return CustomError

    }
    this.productRepository
      .createProduct(createDto!)
      .then((product) => res.json(product))
      .catch((error) => res.status(400).send(error.message));
  };

  public getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10, sort } = req.query;

    try {
      const [error, paginationDto] = PaginationDto.create(+page, +limit, sort);

      if (error) return res.status(400).json({ error: error });

      this.productRepository
        .getProducts(paginationDto!)
        .then((product) => res.json(product))
        .catch((error) => res.status(400).send(error.message));
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  public getProductById = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) res.status(400).send("Bad request");
    this.productRepository
      .getProductById(id)
      .then((product) => res.json(product))
      .catch((error) => res.status(400).json({ error: error.message }));
  };

  public deleteProductById = (req: AuthenticatedRequest, res: Response) => {
    const userAuthorized = req.user?.payload.role;
    if (userAuthorized !== Role.admin)
      return res.status(401).json({ message: "Unauthorized operation" });

    const id = req.params.id;
    if (!id) res.status(400).send("Bad request");
    this.productRepository
      .deleteProduct(id)
      .then((product) => res.json(product))
      .catch((error) => res.status(400).json({ error: error.message }));
  };

  public updateProductById = (req: AuthenticatedRequest, res: Response) => {
    const userAuthorized = req.user?.payload.role;
    if (userAuthorized !== Role.admin)
      return res.status(401).json({ message: "Unauthorized operation" });

    const [error, updateProduct] = UpdateProductDto.create(req.body);
    const id = req.params.id;

    if (error) return res.status(400).json({ error: error });

    if (!id) return res.status(400).json({ error: "ID is required." });

    this.productRepository
      .updateProduct(id, updateProduct!)
      .then((product) => res.json(product))
      .catch((error) => res.status(400).send(error.message));
  };
}
