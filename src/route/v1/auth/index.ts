import { Router } from "express";
import validate from "../../../middleware/validate";
import {  deleteUserSchema, getUserByIdSchema, loginSchema, updateUserSchema } from "../../../validationSchema/user";
import loginHandler from "./login";
import authenticateUser from "../../../middleware/authenticateUser";
import getUserByIdHandler from "./findById";
import updateUserInfoHandler from "./update";
import deleteUserHandler from "./deleteUser";


const authRoutes = Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates the user and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: Successfully logged in and token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *                   example: "jwt_token_here"
 *       400:
 *         description: Invalid email or password.
 *       401:
 *         description: Unauthorized access.
 *       500:
 *         description: Internal server error.
 *   
 * /api/v1/auth/{id}:
 *   get:
 *     summary: Get user details by ID
 *     description: Fetch user details by the provided user ID.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user.
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Successfully fetched user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: User's full name.
 *                   example: "John Doe"
 *                 emailAddress:
 *                   type: string
 *                   description: User's email address.
 *                   example: "user@example.com"
 *                 role:
 *                   type: string
 *                   description: User's role.
 *                   example: "user"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *
 *   patch:
 *     summary: Update user details
 *     description: Updates the details of a user such as username, password, or email.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user to be updated.
 *         schema:
 *           type: string
 *           example: "user123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The new username of the user.
 *                 example: "Jane Doe"
 *               password:
 *                 type: string
 *                 description: The new password of the user.
 *                 example: "NewPassword123!"
 *               emailAddress:
 *                 type: string
 *                 description: The new email address of the user.
 *                 example: "newemail@example.com"
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - user
 *                   - manager
 *                 description: The new role of the user.
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Successfully updated user details.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user by their unique ID.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the user to be deleted.
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

authRoutes.post("/login", validate(loginSchema), loginHandler);
authRoutes.get("/:id", authenticateUser, validate(getUserByIdSchema), getUserByIdHandler);
authRoutes.patch("/:id", validate(updateUserSchema), updateUserInfoHandler);
authRoutes.delete("/:id", validate(deleteUserSchema), deleteUserHandler);




export default authRoutes;
