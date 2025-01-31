import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import APIResponse from "../../../utils/api";
import { formatResponseRecord } from "../../../utils/formatter";
import JWTRepo from "../../../database/repository/JWTRepo";
import { loginInput } from "../../../validationSchema/user";


const loginHandler = async (
  req: Request<{}, {}, loginInput>,
  res: Response
) => {
  const { password } = req.body;
  try {
    const existingUser = await UserRepo.findByEmail(req.body.emailAddress);
    if (!existingUser) {
      APIResponse.error("User with email does not exist!", 404).send(res);
    }
    const isUserPassword = await existingUser?.verifyPassword(password);
    if (!isUserPassword) {
      APIResponse.error("Invalid email or password!", 400).send(res);
    }
    if (existingUser) {
      const { password, ...rest } = existingUser?.toObject();
      const accessToken = JWTRepo.signAccessToken(rest);
      APIResponse.success(
        { accessToken, ...formatResponseRecord(rest) },
        200
      ).send(res);
    }
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default loginHandler;
