export interface Product {
    idIngredient: number;
    strIngredient: string;
    strDescription: string | null;
    strType: string | null;
  }
  export interface IngredientsDTO {
    meals: Array<Product>;
  }