import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MealNoDetails as DishNoDetails,
  DishesService,
} from '../../data-access/dishes.service';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../../shared/material/material.service';
import { AsyncPipe } from '@angular/common';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { RouterModule } from '@angular/router';
import { PageInUrlComponent } from '../page-in-url/page-in-url.component';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent, RouterModule],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss',
})
export class DishesListComponent extends PageInUrlComponent implements OnInit {
  dishesService = inject(DishesService);

  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70];
  allDishes$: Observable<Array<DishNoDetails>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  allIngredientsLength$: Observable<number> | null = null;
  override ngOnInit(): void {
    super.ngOnInit();
    this.itemsOnPage$ = this.dishesService.getNumberOnPage();
    this.allDishes$ = this.dishesService.getPage(this.currentPage$);
    this.allIngredientsLength$ = this.dishesService.getFullLength();
    console.log(this.paramsMap.get('page')?.value)
    if (this.paramsMap.get('page')?.value != null)
      this.currentPage$.next(this.paramsMap.get('page')?.value);
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value) {
      this.dishesService.setNumberOnPage($event.pageSize);
    }
    this.currentPage$.next($event.pageIndex);
    this.paramsMap.get('page')?.setValue($event.pageIndex);
    
  }
  navigateToDestination(arg: string) {
    this.router.navigate(['food', 'dishes', 'details', arg], {
      queryParams: { page: 0 },
    });
  }
}
