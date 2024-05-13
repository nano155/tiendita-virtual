import { NextFunction, Request, Response } from "express";
import { Eerrors, objectError } from "../domain";

export class ErrorRequest {
  static error = (
    error: objectError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    switch (error.code) {
      case Eerrors.DATABASE_ERROR:

      case Eerrors.ROUTING_ERROR:

      case Eerrors.INVALID_TYPES_ERROR:
        res
          .status(400)
          .json({
            status: "error",
            message: error.message,
            cause: error.cause,
          });

        break;
      default:
        res
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
        break;
    }
    next();
  };
}
