import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { createUserInput } from "../../../validationSchema/user";
import APIResponse from "../../../utils/api";

const createUserHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  try {
    const existingUser = await UserRepo.findByEmail(req.body.emailAddress);
    if (existingUser) {
      APIResponse.error("User with email already exists!").send(res);
    }
    const user = await UserRepo.createUser(req.body);
    APIResponse.success(user, 201).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default createUserHandler;
