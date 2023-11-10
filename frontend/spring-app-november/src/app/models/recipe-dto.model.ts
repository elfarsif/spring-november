import { User } from './user-dto.model';

export interface RecipeDTO {
  recipeId: number;
  title: string;
  user: User;
}
