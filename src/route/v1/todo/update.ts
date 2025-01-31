import todoRepo from '../../../database/repository/todoRepo';
import APIResponse from '../../../utils/api';
import { updateTodoList } from './../../../validationSchema/todo';
import { Request, Response } from "express";

const updateTodoListHandler = async (
  req: Request<updateTodoList["params"], {}, updateTodoList["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params; 
    const updatedData = req.body;
    
    const updatedTodo = await todoRepo.updateTodo(id, updatedData);

    if (!updatedTodo) {
      return APIResponse.error("Todo not found", 404).send(res);
    }

    return APIResponse.success(
      { message: "Todo updated successfully", data: updatedTodo },
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default updateTodoListHandler;
