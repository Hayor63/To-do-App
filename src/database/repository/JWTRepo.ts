import { signjwt } from "../../utils/jwt";
import { User } from "../models/user";

export default class JWTRepo {
  static signAccessToken = (
    user: Omit<User, "__v" | "password" | "verifyPassword">
  ) => {
    const accessToken = signjwt(user, "accessTokenPrivateKey", {
      expiresIn: "30d",
    });
    return accessToken;
  };
}
