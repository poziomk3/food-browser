import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
import { DishesService, MealNoDetails } from '../../data-access/dishes.service';
import { FoodCardComponent } from "../../ui/food-card/food-card.component";

@Component({
    selector: 'app-ingredient-details',
    standalone: true,
    templateUrl: './ingredient-details.component.html',
    styleUrl: './ingredient-details.component.scss',
    imports: [AsyncPipe, JsonPipe, MaterialModule, FoodCardComponent]
})
export class IngredientDetailsComponent implements OnInit, OnDestroy {
  id$: Subscription | null = null;
  ingredientDetails$: Observable<Product> | null = null;
  router = inject(Router);
  allDishes$: Observable<Array<MealNoDetails>> | null = null;
  ingredientsService = inject(IngredientService);
  route = inject(ActivatedRoute);
  dishesService = inject(DishesService);
  ngOnInit(): void {
    this.ingredientsService.fetchAPI();
    this.id$ = this.route.params
      .pipe(map(params => params['id']))
      .subscribe(id => {
        this.ingredientDetails$ =
          this.ingredientsService.getProductDetailsById(id);
      });
    if (this.ingredientDetails$)
      this.allDishes$ = this.dishesService
        .getDishesWithIngredient(
          this.ingredientDetails$?.pipe(map(data => data.strIngredient))
        )
        .pipe(tap(data => console.log(data)));
  }

  ngOnDestroy(): void {
    this.id$?.unsubscribe();
  }
  navigateToDestination(arg: string) {
    this.router.navigate(['food', 'dishes', 'details',arg]);
  }
}
