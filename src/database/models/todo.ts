import {
    getModelForClass,
    prop,
    Ref,
    Severity,
    ModelOptions,
  } from "@typegoose/typegoose";
  import { User } from "./user";
  import { Category } from "./category";
  
  @ModelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  export class Todo {
    @prop({ ref: () => User, required: true })
    userId!: Ref<User>;
  
    @prop({ ref: () => Category, required: true })
    categoryId!: Ref<Category>;
  
    @prop({ required: true })
    title!: string;
  
    @prop({ required: true, minlength: 1 })
    description!: string;
  
    @prop({
      required: true,
      enum: ["In Progress", "Completed", "Not started"],
      default: "Not started", 
    })
    status!: string;
  
    @prop({ required: true })
    dueDate!: Date;
  
    @prop({
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    })
    priority!: string;
  }
  
  const TodoModel = getModelForClass(Todo);
  export default TodoModel;
  