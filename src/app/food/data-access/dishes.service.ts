import { Injectable } from '@angular/core';
import { DatapaginationService } from './datapagination.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

export interface MealNoDetails{
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}
interface MealsDTO{
  meals: Array<MealNoDetails>;
}
@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private paginator: DatapaginationService;
  constructor(private http: HttpClient) {
    this.paginator = new DatapaginationService()
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
