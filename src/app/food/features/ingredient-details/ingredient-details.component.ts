import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { IngredientService } from '../../data-access/ingredient.service';
import { Observable, map, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
import { DishesService } from '../../data-access/dishes.service';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { PageInUrlComponent } from '../page-in-url/page-in-url.component';
import { Product } from '../../models/Ingredient';
import { MealNoDetails } from '../../models/Dish';

@Component({
  selector: 'app-ingredient-details',
  standalone: true,
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.scss',
  imports: [AsyncPipe, JsonPipe, MaterialModule, FoodCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientDetailsComponent
  extends PageInUrlComponent
  implements OnInit, OnDestroy
{
  ingredientDetails$: Observable<Product> | null = null;
  allDishes$: Observable<Array<MealNoDetails>> | null = null;
  ingredientsService = inject(IngredientService);
  dishesService = inject(DishesService);
  override ngOnInit(): void {
    super.ngOnInit();
    const { id } = this.route.snapshot.params;

    this.ingredientDetails$ = this.ingredientsService.getProductDetailsById(id);
    this.allDishes$ = this.dishesService
      .getDishesWithIngredient(
        this.ingredientDetails$?.pipe(map(data => data.strIngredient))
      )
      .pipe(tap(data => console.log(data)));
  }

  navigateToDestination(arg: string) {
    this.router.navigate(['food', 'dishes', 'details', arg]);
  }
}
