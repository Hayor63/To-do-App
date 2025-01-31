import { Request, Response } from 'express';
import APIResponse from '../../../utils/api';
import UserRepo from '../../../database/repository/userRepo';
import { updateUserInfo } from '../../../validationSchema/user';

const updateUserInfoHandler = async (
  req: Request<updateUserInfo["params"], {}, updateUserInfo["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body;

    const updatedUserInfo = await UserRepo.updateUser(updatedData,id);

    if (!updatedUserInfo) {
      return APIResponse.error("User not found", 404).send(res); 
    }

      return APIResponse.success(
        { message: "User Info updated successfully", data: updatedUserInfo },
        200
      ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateUserInfoHandler;
