import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  switchMap,
  tap,
} from 'rxjs';
import {
  DishesService,
  MealWithDetails,
} from '../../data-access/dishes.service';
import { MaterialModule } from '../../../shared/material/material.service';
import { SeparatePipe } from '../../utils/separate.pipe';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ExtractYoutubeIdPipe } from '../../utils/extract-youtube-id.pipe';
import { IngredientService } from '../../data-access/ingredient.service';
import { Product } from '../../data-access/ingredient.service';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';

@Component({
  selector: 'app-dish-details',
  standalone: true,
  templateUrl: './dish-details.component.html',
  styleUrl: './dish-details.component.scss',
  imports: [
    AsyncPipe,
    JsonPipe,
    MaterialModule,
    SeparatePipe,
    YouTubePlayerModule,
    ExtractYoutubeIdPipe,
    FoodCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  route = inject(ActivatedRoute);
  router = inject(Router);
  dishesService = inject(DishesService);
  ingredientService = inject(IngredientService);

  id?: Subscription | null = null;
  dishDetails$: Observable<MealWithDetails> | null = null;
  ingredients$: Observable<Array<[Product, string]>> | null = null;

  ngOnInit(): void {
    this.id = this.route.params
      .pipe(map(params => params['id']))
      .subscribe(id => {
        this.dishDetails$ = this.dishesService
          .getDishDetails(id)
          .pipe(tap(data => console.log(data)));
      });
    this.ingredients$ = this.prepareIngredients();
  }

  prepareIngredients() {
    if (this.dishDetails$)
      return this.dishDetails$.pipe(
        switchMap(data => {
          const measures: string[] = [];
          const prods: Observable<Product>[] = [];
          Object.entries(data).forEach(([key, value]: [string, string]) => {
            if (key.includes(`strMeasure`) && value) measures.push(value);
            else if (key.includes('strIngredient') && value) {
              prods.push(this.ingredientService.getProductDetailsByName(value));
            }
          });
          return combineLatest(prods).pipe(
            map((products): Array<[Product, string]> => {
              return products.map((product, index) => {
                return [product, measures[index]];
              });
            })
          );
        })
      );
    return null;
  }

  ngOnDestroy(): void {
    this.id?.unsubscribe();
  }

  navigateToDestination(arg: number) {
    this.router.navigate(['food', 'ingredients', 'details', arg]);
  }
}
