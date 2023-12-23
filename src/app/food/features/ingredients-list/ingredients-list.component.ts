import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, MaterialModule],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsListComponent implements OnInit {
  allIngredients: Observable<Array<Product>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  numberOfPages$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private ingredientService: IngredientService) {}
  ngOnInit(): void {
    this.allIngredients = this.ingredientService.getPageOfIngredients(
      this.currentPage$
    );
    this.numberOfPages$ = this.ingredientService.numberOfPages$;
  }

  updateCurrentPage(newPage: number): void {
    this.currentPage$.next(newPage);
  }
  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }
}
