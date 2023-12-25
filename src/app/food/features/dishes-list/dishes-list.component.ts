import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DishesService } from '../../data-access/dishes.service';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../../shared/material/material.service';
import { AsyncPipe } from '@angular/common';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { RouterModule } from '@angular/router';
import { PageInUrlComponent } from '../page-in-url/page-in-url.component';
import { MealNoDetails } from '../../models/Dish';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss',
})
export class DishesListComponent extends PageInUrlComponent implements OnInit {
  dishesService = inject(DishesService);

  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70];
  allDishes$: Observable<Array<MealNoDetails>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  allIngredientsLength$: Observable<number> | null = null;

  override ngOnInit(): void {
    this.addQueryParam('page', '0');
    this.addQueryParam('pageSize', '5');
    super.ngOnInit();

    this.itemsOnPage$ = this.dishesService.getNumberOnPage();
    this.allDishes$ = this.dishesService.getPage(this.currentPage$);
    this.allIngredientsLength$ = this.dishesService.getFullLength();

    if (this.paramsMap.get('pageSize')?.value > 0) {
      const val = 1 * this.paramsMap.get('pageSize')?.value;
      this.dishesService.setNumberOnPage(val);
    }
    if (this.paramsMap.get('page')?.value > 0) {
      const val = 1 * this.paramsMap.get('page')?.value;
      this.currentPage$.next(val);
    }
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageSize !== this.itemsOnPage$.value) {
      this.dishesService.setNumberOnPage($event.pageSize);
    }
    this.currentPage$.next($event.pageIndex);
    this.paramsMap.get('pageSize')?.setValue($event.pageSize);
    this.paramsMap.get('page')?.setValue($event.pageIndex);
  }
  navigateToDestination(arg: string) {
    this.router.navigate(['food', 'dishes', 'details', arg], {
      queryParams: { page: 0 },
    });
  }
}
