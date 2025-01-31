import { Router } from "express";
import authenticateUser from "../../../middleware/authenticateUser";
import validate from "../../../middleware/validate";
import createCategoryHandler from "./create";
import { CategorySchema, deleteSingleCategorySchema, getAllCategoriesSchema, getSingleCategorySchema, updateCategorySchema } from "../../../validationSchema/category";
import getAllCategoryHandler from "./getAll";
import updateCategoryHandler from "./update";
import getSingleCategoryHandler from "./getById";
import deleteCategoryHandler from "./delete";


/**
 * @swagger
 * /api/v1/categories/create:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the provided details.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               color:
 *                 type: string
 *                 description: The color associated with the category.
 *                 example: "#ff5733"
 *               slug:
 *                 type: string
 *                 description: The unique identifier for the category.
 *                 example: "electronics"
 *     responses:
 *       201:
 *         description: Category successfully created.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 *
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves all available categories.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *       500:
 *         description: Server error.
 *
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves category details by its unique ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the category.
 *         schema:
 *           type: string
 *           example: "category123"
 *     responses:
 *       200:
 *         description: Category details retrieved successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server error.
 *
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category from the system using its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the category to be deleted.
 *         schema:
 *           type: string
 *           example: "category123"
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server error.
 *
 *   patch:
 *     summary: Update a category by ID
 *     description: Updates the details of a category using its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the category to be updated.
 *         schema:
 *           type: string
 *           example: "category123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Home Appliances"
 *               color:
 *                 type: string
 *                 description: The color associated with the category.
 *                 example: "#00ff00"
 *               slug:
 *                 type: string
 *                 description: The unique identifier for the category.
 *                 example: "home-appliances"
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Invalid input data.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server error.
 */




const categoryRoutes = Router();
categoryRoutes.post(
    "/create",
    authenticateUser,
    validate(CategorySchema),
    createCategoryHandler
  );

  //get ALl Categories
categoryRoutes.get(
    "/",
    authenticateUser,
    validate(getAllCategoriesSchema),
    getAllCategoryHandler
  );
  
  //delete Category
  categoryRoutes.delete(
    "/:id",
    authenticateUser,
    validate(deleteSingleCategorySchema),
    deleteCategoryHandler
  );
  
  //update Category
  categoryRoutes.patch(
    "/:id",
    authenticateUser,
    validate(updateCategorySchema),
    updateCategoryHandler
  );
  
  //get single Category
  categoryRoutes.get(
    "/:id",
    authenticateUser,
    validate(getSingleCategorySchema),
    getSingleCategoryHandler
  );
  export default categoryRoutes