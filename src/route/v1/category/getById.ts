;import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import CategoryRepo from "../../../database/repository/categoryRepo";
import { getSingleCategory } from "../../../validationSchema/category";


const getSingleCategoryHandler = async (
  req: Request<{ id: string }, {}, getSingleCategory>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getSingleCategory = await CategoryRepo.getById(id);
    return APIResponse.success(
      { message: "Category retrieved successfully", data: getSingleCategory },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};



export default getSingleCategoryHandler;