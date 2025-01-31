import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import CategoryRepo from "../../../database/repository/categoryRepo";
import { deleteCategory } from "../../../validationSchema/category";


const deleteCategoryHandler = async (
  req: Request<{ id: string }, {}, deleteCategory>,
  res: Response
) => {
  
  try {
    const { id } = req.params;
    const deleteCategory = await CategoryRepo.deleteCategory(id);
    return APIResponse.success(
      { message: "category deleted successfully", data:deleteCategory },
      200 
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};


export default deleteCategoryHandler


