import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import validate from "../../../middleware/validate";
import { deleteTodoListSchema, getAllTodoListSchema, getTodoListByIdSchema, TodoValidationSchema, updateTodolistSchema } from "../../../validationSchema/todo";
import createTodoHandler from "./create";
import getSingleTodoHandler from "./getById";
import getAllTodoHandler from "./getAll";
import deleteTodoHandler from "./delete";
import updateTodoListHandler from "./update";

const todoRoutes = Router();
/**
 * @swagger
 * /api/v1/todo/create:
 *   post:
 *     summary: Create a new Todo item
 *     description: Creates a new Todo item after validating the input data.
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID associated with the Todo item.
 *                 example: "user123"
 *               categoryId:
 *                 type: string
 *                 description: The category ID to which the Todo belongs.
 *                 example: "category123"
 *               title:
 *                 type: string
 *                 description: The title of the Todo item.
 *                 example: "Finish Report"
 *               description:
 *                 type: string
 *                 description: A detailed description of the Todo item.
 *                 example: "Complete the quarterly financial report."
 *               status:
 *                 type: string
 *                 enum:
 *                   - "In Progress"
 *                   - "Completed"
 *                   - "Not started"
 *                 default: "Not started"
 *                 description: The current status of the Todo item.
 *                 example: "In Progress"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date of the Todo item (must be a future date).
 *                 example: "2025-02-01T00:00:00Z"
 *               priority:
 *                 type: string
 *                 enum:
 *                   - "Low"
 *                   - "Medium"
 *                   - "High"
 *                 default: "Medium"
 *                 description: The priority level of the Todo item.
 *                 example: "High"
 *     responses:
 *       201:
 *         description: Todo item successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo created successfully"
 *                 todo:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user123"
 *                     categoryId:
 *                       type: string
 *                       example: "category123"
 *                     title:
 *                       type: string
 *                       example: "Finish Report"
 *                     description:
 *                       type: string
 *                       example: "Complete the quarterly financial report."
 *                     status:
 *                       type: string
 *                       example: "In Progress"
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T00:00:00Z"
 *                     priority:
 *                       type: string
 *                       example: "High"
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized access, authentication required.
 *       500:
 *         description: Server error.
 * 
 * /api/v1/todo/:
 *   get:
 *     summary: Get all Todo items
 *     description: Retrieves a list of all Todo items.
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: List of Todo items successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                     example: "user123"
 *                   categoryId:
 *                     type: string
 *                     example: "category123"
 *                   title:
 *                     type: string
 *                     example: "Finish Report"
 *                   description:
 *                     type: string
 *                     example: "Complete the quarterly financial report."
 *                   status:
 *                     type: string
 *                     example: "In Progress"
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-01T00:00:00Z"
 *                   priority:
 *                     type: string
 *                     example: "High"
 *       500:
 *         description: Server error.

 * /api/v1/todo/{id}:
 *   get:
 *     summary: Get a Todo item by ID
 *     description: Retrieves a Todo item based on the provided ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Todo item.
 *         schema:
 *           type: string
 *           example: "todo123"
 *     responses:
 *       200:
 *         description: Todo item successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user123"
 *                     categoryId:
 *                       type: string
 *                       example: "category123"
 *                     title:
 *                       type: string
 *                       example: "Finish Report"
 *                     description:
 *                       type: string
 *                       example: "Complete the quarterly financial report."
 *                     status:
 *                       type: string
 *                       example: "In Progress"
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T00:00:00Z"
 *                     priority:
 *                       type: string
 *                       example: "High"
 *       404:
 *         description: Todo item not found.
 *       500:
 *         description: Server error.
 * 
 *   patch:
 *     summary: Update a Todo item by ID
 *     description: Updates an existing Todo item by the provided ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Todo item to update.
 *         schema:
 *           type: string
 *           example: "todo123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the Todo item.
 *                 example: "Updated Report"
 *               description:
 *                 type: string
 *                 description: A detailed description of the Todo item.
 *                 example: "Updated description of the quarterly financial report."
 *               status:
 *                 type: string
 *                 enum:
 *                   - "In Progress"
 *                   - "Completed"
 *                   - "Not started"
 *                 default: "Not started"
 *                 description: The current status of the Todo item.
 *                 example: "Completed"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The new due date of the Todo item.
 *                 example: "2025-02-10T00:00:00Z"
 *               priority:
 *                 type: string
 *                 enum:
 *                   - "Low"
 *                   - "Medium"
 *                   - "High"
 *                 default: "Medium"
 *                 description: The updated priority level of the Todo item.
 *                 example: "Medium"
 *     responses:
 *       200:
 *         description: Todo item successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo updated successfully."
 *                 todo:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user123"
 *                     categoryId:
 *                       type: string
 *                       example: "category123"
 *                     title:
 *                       type: string
 *                       example: "Updated Report"
 *                     description:
 *                       type: string
 *                       example: "Updated description of the quarterly financial report."
 *                     status:
 *                       type: string
 *                       example: "Completed"
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-10T00:00:00Z"
 *                     priority:
 *                       type: string
 *                       example: "Medium"
 *       404:
 *         description: Todo item not found.
 *       500:
 *         description: Server error.
 * 
 *   delete:
 *     summary: Delete a Todo item by ID
 *     description: Deletes a Todo item by the provided ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Todo item to delete.
 *         schema:
 *           type: string
 *           example: "todo123"
 *     responses:
 *       200:
 *         description: Todo item successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo deleted successfully."
 *       404:
 *         description: Todo item not found.
 *       500:
 *         description: Server error.
 */


todoRoutes.post(
  "/create",
  authenticateUser,
  validate(TodoValidationSchema),
  createTodoHandler
);

todoRoutes.get(
  "/:id",
  authenticateUser,
  validate(getTodoListByIdSchema),
  getSingleTodoHandler
);

todoRoutes.get(
  "/",
  authenticateUser,
  validate(getAllTodoListSchema),
  getAllTodoHandler
);

todoRoutes.patch(
  "/:id",
  authenticateUser,
  validate(updateTodolistSchema),
  updateTodoListHandler
);

todoRoutes.delete(
  "/:id",
  authenticateUser,
  validate(deleteTodoListSchema),
  deleteTodoHandler
);



export default todoRoutes;
