import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
import { PageEvent } from '@angular/material/paginator';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent, RouterModule],
})
export class IngredientsListComponent implements OnInit {
  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70];

  allIngredients: Observable<Array<Product>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  allIngredientsLength$: Observable<number> | null = null;

  ingredientsService = inject(IngredientService);
  router=inject(Router);

  ngOnInit(): void {
    this.itemsOnPage$ = this.ingredientsService.getNumberOnPage();
    this.allIngredients = this.ingredientsService.getPage(this.currentPage$);
    this.allIngredientsLength$ = this.ingredientsService.getFullLength();
  }


  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value) {
      this.ingredientsService.setNumberOnPage($event.pageSize);
    }
    this.currentPage$.next($event.pageIndex);
  }
  navigateToDestination(arg:number) {
    this.router.navigate(['food','ingredients','details',arg]);
  }
}
