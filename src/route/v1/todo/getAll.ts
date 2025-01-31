import { Request, Response } from "express";
import todoRepo from "../../../database/repository/todoRepo";
import APIResponse from "../../../utils/api";

const getAllTodoHandler = async (req: Request, res: Response) => {
  try {
    const getAllTodo = await todoRepo.getAllTodo();

    if (!getAllTodo || getAllTodo.length === 0) {
      return APIResponse.error("No todos found", 404).send(res);
    }

    return APIResponse.success(
      { message: "Todos retrieved successfully", data: getAllTodo },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default getAllTodoHandler;



