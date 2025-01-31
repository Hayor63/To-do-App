import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import CategoryRepo from "../../../database/repository/categoryRepo";

const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const getAllCategory = await CategoryRepo.getAllCategories();
    if (!getAllCategory || getAllCategory.length === 0) {
      return APIResponse.error("No todos found", 404).send(res);
    }
    return APIResponse.success(
      { message: "Category retrieved successfully", data: getAllCategory },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default getAllCategoryHandler;
