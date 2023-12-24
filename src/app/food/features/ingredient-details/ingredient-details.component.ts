import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ingredient-details',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.scss',
})
export class IngredientDetailsComponent implements OnInit, OnDestroy {
  id$: Subscription | null = null;
  ingredientDetails$: Observable<Product> | null = null;

  constructor(
    private ingredientsService: IngredientService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.id$?.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredientsService.fetchAPI();
    this.id$ = this.route.params
      .pipe(
        map(params => params['id']),
        tap(data => {
          this.ingredientDetails$ =
            this.ingredientsService.getProductDetailsById(data);
        })
      )
      .subscribe();
  }
}
