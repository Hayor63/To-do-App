import { DocumentType } from "@typegoose/typegoose";
import UserModel, { User } from "../models/user";

export default class UserRepo {
  static createUser: (
    user: Omit<User, "verifyPassword">
  ) => Promise<User> = async (user) => {
    return await UserModel.create(user);
  };


  static findByEmail: (
    emailAddress: string
  ) => Promise<DocumentType<User> | null> = async (emailAddress) => {
    return await UserModel.findOne({ emailAddress });
  };


  static updateUser: (
    updateParams: Partial<User>,
    id: string
  ) => Promise<Omit<User, "password"> | null> = async (updateParams, id) => {
    const { password, ...rest } = updateParams;
    const user = await this.findById(id);
    if (!user) return null;
    if (password) {
      user.password = password;
     await user.save();
    }
    await UserModel.findByIdAndUpdate(id, rest, { new: true });
    return rest as User;
  //     // Return updated user data excluding password
  // return { ...user.toObject(), password: undefined }; // Ensure you don't return the password
  };

  static getUserProfile = async (id: string) => {
    if (!id) throw new Error("User ID is required"); 
  
    return await UserModel.findById(id).select("-password"); 
  };
  

  static findById = async (id: string) => {
    return await UserModel.findById(id);
  };

  static deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  };
}
