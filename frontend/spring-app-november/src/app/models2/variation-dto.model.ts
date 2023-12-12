import { RecipeDTO } from '../models/recipe-dto.model';

export interface VariationDTO {
  variationId: number;
  variationTitle: string;
  instructions: string;
  recipe: RecipeDTO;
  isMain: boolean;
}
