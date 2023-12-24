import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MealNoDetails as DishNoDetails,
  DishesService,
} from '../../data-access/dishes.service';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '../../../shared/material/material.service';
import { AsyncPipe } from '@angular/common';
import { FoodCardComponent } from '../../ui/food-card/food-card.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dishes-list',
  standalone: true,
  imports: [AsyncPipe, MaterialModule, FoodCardComponent, RouterModule],
  templateUrl: './dishes-list.component.html',
  styleUrl: './dishes-list.component.scss',
})
export class DishesListComponent implements OnInit {




  pageSizeOptions = [1, 3, 5, 10, 30, 50, 70];
  allDishes$: Observable<Array<DishNoDetails>> | null = null;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsOnPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  allIngredientsLength$: Observable<number> | null = null;
  constructor(private dishesService: DishesService,private router: Router) {}
  ngOnInit(): void {
    this.itemsOnPage$ = this.dishesService.getNumberOnPage();
    this.allDishes$ = this.dishesService.getPage(this.currentPage$);
    this.allIngredientsLength$ = this.dishesService.getFullLength();
  }

  nextPage(page: number) {
    this.currentPage$.next(page);
  }

  handlePageEvent($event: PageEvent) {
    if ($event.pageSize != this.itemsOnPage$.value) {
      this.dishesService.setNumberOnPage($event.pageSize);
    }
    this.currentPage$.next($event.pageIndex);
  }
  navigateToDestination(arg:string) {
    this.router.navigate(['food','dishes',arg,'details']);
  }
}
