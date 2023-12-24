import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service'
import { AsyncPipe } from '@angular/common'
import { MaterialModule } from '../../../shared/material/material.service'
import { PageEvent } from '@angular/material/paginator'
import { FoodCardComponent } from '../../ui/food-card/food-card.component'
@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent],
})
export class IngredientsListComponent implements OnInit {
  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70]

  allIngredients: Observable<Array<Product>> | null = null
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  allIngredientsLength$: Observable<number> | null = null

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.itemsOnPage$ = this.ingredientService.getNumberOnPage()
    this.allIngredients = this.ingredientService.getPage(this.currentPage$)
    this.allIngredientsLength$ = this.ingredientService.getFullLength()
  }

  nextPage(page: number) {
    this.currentPage$.next(page)
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value) {
      this.ingredientService.setNumberOnPage($event.pageSize)
    }
    this.currentPage$.next($event.pageIndex)
  }
}
