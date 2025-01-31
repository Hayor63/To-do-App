import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import APIResponse from "../utils/api";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void | Promise<void> => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      APIResponse.error;
    }
  };

export default validate;
