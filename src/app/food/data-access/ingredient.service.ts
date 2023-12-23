import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
export interface Product {
  idIngredient: number;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}
export interface IngredientsDTO {
  meals: Array<Product>;
}

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {}
  ingredientsPersisted$: BehaviorSubject<Array<Product>> = new BehaviorSubject<
    Array<Product>
  >([]);

  itemsPerPages$: BehaviorSubject<number> = new BehaviorSubject<number>(20);

  getAllIngredients(): void {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    this.http
      .get<IngredientsDTO>(url)
      .pipe(
        map((data) => data.meals),
        tap((ingredients) => {
          this.ingredientsPersisted$.next(ingredients);
        })
      )
      .subscribe();
  }

  getPageOfIngredients(page$: Observable<number>): Observable<Array<Product>> {
    if (this.ingredientsPersisted$.value.length === 0) this.getAllIngredients();
    return combineLatest([this.ingredientsPersisted$, page$]).pipe(
      switchMap(([ingredients, page]) => {
        const startIndex = page * this.itemsPerPages$.value;
        const endIndex = startIndex + this.itemsPerPages$.value;
        return of(ingredients.slice(startIndex, endIndex));
      })
    );
  }

  getIngredientsLength(): Observable<number> {
    if (this.ingredientsPersisted$.value.length === 0) this.getAllIngredients();
    return this.ingredientsPersisted$.pipe(
      map((ingredients) => ingredients.length)
    );
  }

  setNumberOfIngredientsOnPage(numberOfIngs: number): void {
    this.itemsPerPages$.next(numberOfIngs);
   
  }
}
