import { CreateCategory } from "../../validationSchema/category";
import CategoryModel, { Category } from "../models/category";

export default class CategoryRepo {
  static createCategory: (category: CreateCategory) => Promise<Category> =
    async (category) => {
      const data = await CategoryModel.create(category);
      return data;
    };

  //get by Id
  static getById: (categoryId: string) => Promise<any> = async (categoryId) => {
    const data = await CategoryModel.findById(categoryId);
    return data;
  };
  //get all Categories
  static getAllCategories = async () => {
    const categories = await CategoryModel.find();
    return categories;
  };

  //delete Category
  static deleteCategory: (categoryId: string) => Promise<any> = async (
    categoryId
  ) => {
    const data = await CategoryModel.findByIdAndDelete(categoryId);
    return data;
  };

  //update Category
  static updateCategory: (
    id: string,
    updateParams: Partial<CreateCategory>
  ) => Promise<any> = async (id, updateParams) => {
    return await CategoryModel.findByIdAndUpdate(id, updateParams, {
      new: true,
    });
  };
}
