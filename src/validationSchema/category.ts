import { object, string, TypeOf, z } from "zod";

export const CategorySchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    color: string({
      required_error: "Color is required",
    }),
    slug: string().optional(),
  }),
});

// Get All Categories Schema
export const getAllCategoriesSchema = object({});

//Delete Categories
export const deleteSingleCategorySchema = object({
  params: object({
    id: string({
      required_error: "category ID is required",
    }),
  }),
});

// get Single Category
export const getSingleCategorySchema = object({
  params: object({
    id: string({
      required_error: "Category ID is required",
    }),
  }),
});

//Update Category
export const updateCategorySchema = object({
  params: object({
    id: string({
      required_error: "category ID is required",
    }),
  }),
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    color: string({
      required_error: "Color is required",
    }),
    slug: string().optional(),
  }),
});

export type Category = z.infer<typeof CategorySchema>["body"];
export type CreateCategory = Omit<Category, "slug">;
export type getAllCategories = TypeOf<typeof getAllCategoriesSchema>
export type deleteCategory = TypeOf<typeof deleteSingleCategorySchema>["params"]
export type getSingleCategory = TypeOf<typeof getSingleCategorySchema>["params"]
export type updateCategory = TypeOf<typeof updateCategorySchema>

