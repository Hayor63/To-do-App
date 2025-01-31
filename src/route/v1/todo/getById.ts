import { Request, Response } from "express";
import { getSingleTodoList } from "../../../validationSchema/todo";
import todoRepo from "../../../database/repository/todoRepo";
import APIResponse from "../../../utils/api";

const getSingleTodoHandler = async (
  req: Request<{ id: string }, {}, getSingleTodoList>,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    const getSingleTodo = await todoRepo.getTodoById(id);

    if (!getSingleTodo) {
      return APIResponse.error("Todo not found", 404).send(res);
    }

    return APIResponse.success(
      { message: "Todo retrieved successfully", data: getSingleTodo },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default getSingleTodoHandler;
