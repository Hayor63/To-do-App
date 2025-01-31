import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import todoRepo from "../../../database/repository/todoRepo";
import { deleteTodo } from "../../../validationSchema/todo";

const deleteTodoHandler = async (
  req: Request<{ id: string }, {}, deleteTodo>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deleteTodo = await todoRepo.deleteTodo(id);
    return APIResponse.success(
      { message: "Todo list deleted successfully", data: deleteTodo },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default deleteTodoHandler;
