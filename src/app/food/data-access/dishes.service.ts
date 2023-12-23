import { Injectable } from '@angular/core';
import { DatapaginationService } from './datapagination.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface MealNoDetails {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
export interface MealWithDetails extends MealNoDetails {
  strInstructions: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1:string;
  strMeasure2:string;
  strMeasure3:string;
  strMeasure4:string;
  strMeasure5:string;
  strMeasure6:string;
  strMeasure7:string;
  strMeasure8:string;
  strMeasure9:string;
  strMeasure10:string;
  strMeasure11:string;
  strMeasure12:string;
  strMeasure13:string;
  strMeasure14:string;
  strMeasure15:string;
  strMeasure16:string;
  strMeasure17:string;
  strMeasure18:string;
  strMeasure19:string;
  strMeasure20:string;
}
  
interface MealsDTO {
  meals: Array<MealNoDetails>;
}
interface MealDetailsDTO {
  meals: [MealWithDetails];
}
@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private paginator: DatapaginationService;
  constructor(private http: HttpClient) {
    this.paginator = new DatapaginationService();
  }

  persistedData$: BehaviorSubject<Array<MealNoDetails>> = new BehaviorSubject<
    Array<MealNoDetails>
  >([]);
  // https://www.themealdb.com/api/json/v1/1/search.php?s= albo https://www.themealdb.com/api/json/v1/1/filter.php?i=
  fetchAPI(): void {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    this.http
      .get<MealsDTO>(url)
      .pipe(
        map((data) => data.meals),
        tap((meals) => {
          this.persistedData$.next(meals);
        })
      )
      .subscribe();
  }

  getDishDetails(id: string): Observable<MealWithDetails> {
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id;
    return this.http
      .get<MealDetailsDTO>(url)
      .pipe(map((data) => data.meals[0]));
  }

  getPage(page$: Observable<number>): Observable<Array<MealNoDetails>> {
    if (this.persistedData$.value.length === 0) this.fetchAPI();
    return this.paginator.getPage(page$, this.persistedData$);
  }

  getFullLength(): Observable<number> {
    if (this.persistedData$.value.length === 0) this.fetchAPI();
    return this.persistedData$.pipe(map((meals) => meals.length));
  }

  setNumberOnPage(arg: number): void {
    this.paginator.setNumberOnPage(arg);
  }
  getNumberOnPage(): BehaviorSubject<number> {
    return this.paginator.getNumberOnPage();
  }
}
