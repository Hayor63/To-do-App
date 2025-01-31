import { date, object, string, TypeOf, z } from "zod";

export const TodoValidationSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),

    categoryId: string({
      required_error: "Cart ID is required",
    }),

    title: string({
      required_error: "Title is required",
    }),

    description: string({
      required_error: "Description is required",
    }).min(1, "Description must be at least 1 character long"),

    status: z
      .enum(["In Progress", "Completed", "Not started"], {
        required_error: "Status is required",
      })
      .default("Not started"),

    dueDate: string({
      required_error: "Due date is required",
    }).refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date in the future",
    }),

    priority: z
      .enum(["Low", "Medium", "High"], {
        required_error: "Priority is required",
      })
      .default("Medium"),
  }),
});

//get All todolist
export const getAllTodoListSchema = object({});

//Get single todolist
export const getTodoListByIdSchema = object({
  params: object({
    id: string({
      required_error: "todo ID is required",
    }),
  }),
});

//Delete single todolist
export const deleteTodoListSchema = object({
  params: object({
    id: string({
      required_error: "Todo ID is required",
    }),
  }),
});

//update todolist
export const updateTodolistSchema = object({
  params: object({
    id: string({
      required_error: "Todo ID is required",
    }),
  }),
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),

    categoryId: string({
      required_error: "Cart ID is required",
    }),

    title: string({
      required_error: "Title is required",
    }),

    description: string({
      required_error: "Description is required",
    }).min(1, "Description must be at least 1 character long"),

    status: z
      .enum(["In Progress", "Completed", "Not started"], {
        required_error: "Status is required",
      })
      .default("Not started"),

    dueDate: string({
      required_error: "Due date is required",
    }).refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date in the future",
    }),

    priority: z
      .enum(["Low", "Medium", "High"], {
        required_error: "Priority is required",
      })
      .default("Medium"),
  }),
});


export type createTodoList = TypeOf<typeof TodoValidationSchema>["body"];
export type getAllTodoList = TypeOf<typeof getAllTodoListSchema>
export type deleteTodo = TypeOf<typeof deleteTodoListSchema>["params"]
export type getSingleTodoList = TypeOf<typeof getTodoListByIdSchema>["params"]
export type updateTodoList = {
  params: TypeOf<typeof updateTodolistSchema>["params"];
  body: TypeOf<typeof updateTodolistSchema>["body"];
};

