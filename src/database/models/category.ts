import {
    DocumentType,
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Severity,
  } from "@typegoose/typegoose";
  import * as argon2 from "argon2";

  @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  @pre<Category>("save", async function () {
    if (!this.isModified("name")) return; // Ensure 'name' is the relevant field
    const slugified = this.name
      .trim() // Remove leading/trailing spaces
      .toLowerCase()
      .replace(/\s+/g, "-"); // Replace multiple spaces with a single hyphen
    this.slug = slugified;
    return;
  })
  
  export class Category {
    @prop({ required: true, minlength: 1  })
    name!: string;
    @prop({ required: true })
    color!: string;
    @prop()
    slug: string;
  }
  
  const CategoryModel = getModelForClass(Category);
  export default CategoryModel;
  