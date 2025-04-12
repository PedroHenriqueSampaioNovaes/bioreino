import { Category } from '../../models/Category';

export class ListCategoryService {
  static async execute() {
    const categories = await Category.find();

    return categories;
  }
}
