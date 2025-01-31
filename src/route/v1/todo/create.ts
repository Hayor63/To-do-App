import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import todoRepo from "../../../database/repository/todoRepo";
import { createTodoList } from '../../../validationSchema/todo';

const createTodoHandler = async (
  req: Request<{}, {}, createTodoList>,
  res: Response
) => {
  try {
    const todo = await todoRepo.createTodoList(req.body);
    
    return APIResponse.success(
      { message: "Todo created successfully", data: todo },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default createTodoHandler;

