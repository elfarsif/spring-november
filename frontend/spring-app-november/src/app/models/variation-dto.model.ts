import { RecipeDTO } from './recipe-dto.model';

export interface VariationDTO {
  variationId: number;
  title: string;
  intructions: string;
  recipe: RecipeDTO;
}
