import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { DishesService, MealWithDetails } from '../../data-access/dishes.service';

@Component({
  selector: 'app-dish-details',
  standalone: true,
  imports: [AsyncPipe,JsonPipe],
  templateUrl: './dish-details.component.html',
  styleUrl: './dish-details.component.scss',
})
export class DishDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private dishesService:DishesService) {}
  id$?: Observable<string>;
  dishDetails$?: Observable<MealWithDetails>
  ngOnInit(): void {
    this.id$ = this.route.params.pipe(map((params) => params['id']),tap((id)=>{this.dishDetails$=this.dishesService.getDishDetails(id)}));
  }
}
