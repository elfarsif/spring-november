import { RecipeDTO } from './recipe-dto.model';

export interface VariationDTO {
  variationId: number;
  variationTitle: string;
  instructions: string;
  recipe: RecipeDTO;
}
