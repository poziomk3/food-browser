import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MaterialModule],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsListComponent implements OnInit {
  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value)
      this.ingredientService.setNumberOfIngredientsOnPage($event.pageSize);
    this.currentPage$.next($event.pageIndex);
  }
  pageSizeOptions = [30, 50, 70];
  allIngredients: Observable<Array<Product>> | null = null;

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.pageSizeOptions[0] || 2);

  allIngredientsLength$: Observable<number> | null = null;
  constructor(private ingredientService: IngredientService) {}
  ngOnInit(): void {

    this.ingredientService.setNumberOfIngredientsOnPage(
      this.itemsOnPage$.value
    );
    this.allIngredients = this.ingredientService.getPageOfIngredients(
      this.currentPage$
    );
    this.itemsOnPage$ = this.ingredientService.itemsPerPages$;
    this.allIngredientsLength$ =this.ingredientService.getIngredientsLength();
    
  }

  nextPage(page: number) {
    this.currentPage$.next(page);
  }
}
