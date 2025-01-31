import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import UserRepo from "../../../database/repository/userRepo";
import { getUserId } from "../../../validationSchema/user";

const getUserByIdHandler = async (
  req: Request<{ id: string }>, // Simplified type annotation
  res: Response
) => {
  try {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Fetch the user from the repository
    const user = await UserRepo.findById(id);

    // If the user is not found, return a 404 error
    if (!user) {
      return APIResponse.error("User not found", 404).send(res);
    }

    // Return a success response with the user data
    APIResponse.success(
      { message: "User info retrieved successfully", data: user },
      200
    ).send(res);
  } catch (error) {
    // Handle errors and return a 500 error response
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    APIResponse.error(errorMessage, 500).send(res);
  }
};

export default getUserByIdHandler;
  