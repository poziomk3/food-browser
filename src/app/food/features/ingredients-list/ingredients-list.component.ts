import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';
import { PageEvent } from '@angular/material/paginator';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { RouterModule } from '@angular/router';
import { PageInUrlComponent } from '../page-in-url/page-in-url.component';
@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent, RouterModule],
})
export class IngredientsListComponent
  extends PageInUrlComponent
  implements OnInit
{
  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70];

  allIngredients: Observable<Array<Product>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  allIngredientsLength$: Observable<number> | null = null;

  ingredientsService = inject(IngredientService);

  override ngOnInit(): void {
    this.addQueryParam('page', '0');
    this.addQueryParam('pageSize', '5');
    super.ngOnInit();

    this.itemsOnPage$ = this.ingredientsService.getNumberOnPage();
    this.allIngredients = this.ingredientsService.getPage(this.currentPage$);
    this.allIngredientsLength$ = this.ingredientsService.getFullLength();
    if (this.paramsMap.get('pageSize')?.value > 0) {
      const val = 1 * this.paramsMap.get('pageSize')?.value;
      this.ingredientsService.setNumberOnPage(val);
    }
    if (this.paramsMap.get('page')?.value > 0) {
      const val = 1 * this.paramsMap.get('page')?.value;
      this.currentPage$.next(val);
    }
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value) {
      this.ingredientsService.setNumberOnPage($event.pageSize);
    }
    this.currentPage$.next($event.pageIndex);
    this.paramsMap.get('pageSize')?.setValue($event.pageSize);
    this.paramsMap.get('page')?.setValue($event.pageIndex);
  }

  navigateToDestination(arg: number) {
    this.router.navigate(['food', 'ingredients', 'details', arg]);
  }
}
