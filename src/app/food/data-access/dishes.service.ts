import { Injectable, inject } from '@angular/core';
import { DatapaginationService } from './datapagination.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import {
  Area,
  Category,
  MealDetailsDTO,
  MealNoDetails,
  MealWithDetails,
  MealsDTO,
} from '../models/Dish';

export interface FilterInterface{
  strCategory?: string[]|null;
  strArea?: string[]|null;
}
@Injectable({
  providedIn: 'root',
})
export class DishesService  {
  paginator: DatapaginationService = new DatapaginationService();
  http = inject(HttpClient);

  persistedData$: BehaviorSubject<Array<MealNoDetails>> = new BehaviorSubject<
    Array<MealNoDetails>
  >([]);
  categories$: BehaviorSubject<Array<Category>> = new BehaviorSubject<
    Array<Category>
  >([]);
  areas$: BehaviorSubject<Array<Area>> = new BehaviorSubject<Array<Area>>([]);
  // https://www.themealdb.com/api/json/v1/1/search.php?s= albo https://www.themealdb.com/api/json/v1/1/filter.php?i=
  fetchAPI(): void {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    this.http
      .get<MealsDTO>(url)
      .pipe(
        map(data => data.meals),
        tap(meals => {
          this.persistedData$.next(meals);
        })
      )
      .subscribe();
  }

  fetchCategories(): void {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    this.http
      .get<{ meals: Array<Category> }>(url)
      .pipe(map(data => data.meals))
      .subscribe(categories => this.categories$.next(categories));
  }

  fetchAreas(): void {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    this.http
      .get<{ meals: Array<Area> }>(url)
      .pipe(map(data => data.meals))
      .subscribe(areas => this.areas$.next(areas));
  }

  getDishCategories(): Observable<Array<Category>> {
    if (this.categories$.value.length === 0) this.fetchCategories();
    return this.categories$;
  }
  getDishAreas(): Observable<Array<Area>>{
    if (this.areas$.value.length === 0) this.fetchAreas();
    return this.areas$;
  }

  


  getDishDetails(id: string): Observable<MealWithDetails> {
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id;
    return this.http.get<MealDetailsDTO>(url).pipe(map(data => data.meals[0]));
  }

  getDishesWithIngredient(
    ingredient: Observable<string>
  ): Observable<Array<MealNoDetails>> {
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
    return ingredient.pipe(
      switchMap(ing =>
        this.http.get<MealsDTO>(url + ing).pipe(map(data => data.meals))
      )
    );
  }

  getPage(page$: Observable<number>): Observable<Array<MealNoDetails>> {
    if (this.persistedData$.value.length === 0) this.fetchAPI();
    return this.paginator.getPage(page$, this.persistedData$);
  }

  getFullLength(): Observable<number> {
    if (this.persistedData$.value.length === 0) this.fetchAPI();
    return this.persistedData$.pipe(map(meals => meals.length));
  }

  setNumberOnPage(arg: number): void {
    this.paginator.setNumberOnPage(arg);
  }
  getNumberOnPage(): BehaviorSubject<number> {
    return this.paginator.getNumberOnPage();
  }
}
