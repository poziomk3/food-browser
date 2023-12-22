import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
export interface Product{
  idIngredient:number;
  strIngredient:string;
  strDescription:string|null;
}
export interface IngredientsDTO{
meals:Array<Product>

}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  constructor(private http: HttpClient) {}



  getAllIngredients(): Observable<Array<Product>> {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    return this.http.get<IngredientsDTO>(url).pipe( map((data) => data.meals));
  }
}
