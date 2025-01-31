import { Router } from "express";
import validate from "../../../middleware/validate";
import createUserHandler from "./create";
import { createUserSchema } from "../../../validationSchema/user";


/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *                 example: "P@ssw0rd!"
 *               emailAddress:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: "john.doe@example.com"
 *               role:
 *                 type: string
 *                 enum: ["admin", "user", "manager"]
 *                 description: The role of the user.
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */

 

const userRoutes = Router()
userRoutes.post("/create", validate(createUserSchema), createUserHandler);

export default userRoutes;