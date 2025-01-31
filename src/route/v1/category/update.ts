import { updateCategory } from './../../../validationSchema/category';
import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CategoryRepo from '../../../database/repository/categoryRepo';


const updateCategoryHandler = async (
    req: Request<updateCategory["params"], {}, updateCategory["body"]>,
    res: Response
  ) => {
    try {
      const { id } = req.params; 
      const updatedData = req.body; 
  
      const updatedCategory = await CategoryRepo.updateCategory(id, updatedData);
  
      if (!updatedCategory) {
        return APIResponse.error("Category not found", 404).send(res);
      }
  
      return APIResponse.success(
        { message: "Category updated successfully", data: updatedCategory },
        200
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  

export default updateCategoryHandler;
