import { createTodoList } from "../../validationSchema/todo";
import TodoModel, { Todo } from "../models/todo";

export default class todoRepo {
  static createTodoList: (todo: createTodoList) => Promise<Todo> = async (
    todo
  ) => {
    const data = await TodoModel.create(todo);
    return data;
  };

  // get all
  static getAllTodo = async () => {
    const todoList = await TodoModel.find();
    return todoList;
  };

  // get by Id
  static getTodoById: (todoId: string) => Promise<any> = async (todoId) => {
    const data = await TodoModel.findById(todoId);
    return data;
  };

  //delete TodoLst
  static deleteTodo: (todoId: string) => Promise<any> = async (todoId) => {
    const data = await TodoModel.findByIdAndDelete(todoId);
    return data;
  };

  //update TodoList
  static updateTodo: (
    id: string,
    updateParams: Partial<createTodoList>
  ) => Promise<any> = async (id, updateParams) => {
    return await TodoModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
  };
}
