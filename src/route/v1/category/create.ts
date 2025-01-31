import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import { CreateCategory } from "../../../validationSchema/category";
import CategoryRepo from "../../../database/repository/categoryRepo";

const createCategoryHandler = async (
    req: Request<{}, {}, CreateCategory>,
    res: Response
  ) => {
    try {
      const category = await CategoryRepo.createCategory(req.body);
      return APIResponse.success(
        { message: "Category created successfully", data: category },
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message).send(res);
    }
  };

  export default createCategoryHandler;