import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const validate =
  (schema: ZodType<any, any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
