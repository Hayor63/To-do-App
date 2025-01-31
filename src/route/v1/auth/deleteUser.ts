import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import APIResponse from "../../../utils/api";
import { deleteUser } from "../../../validationSchema/user";

const deleteUserHandler = async (
    req: Request<{ id: string }, {}, deleteUser>,
    res: Response
  ) => {
    
    try {
      const { id } = req.params;
      const deleteUser = await UserRepo.deleteUser(id);
      return APIResponse.success(
        { message: "User deleted successfully", data:deleteUser },
        200 
      ).send(res);
    } catch (error) {
      return APIResponse.error((error as Error).message, 500).send(res);
    }
  };
  
  
  export default deleteUserHandler