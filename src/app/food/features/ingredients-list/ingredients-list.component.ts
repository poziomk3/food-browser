import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IngredientService } from '../../data-access/ingredient.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  imports: [AsyncPipe,JsonPipe],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
})
export class IngredientsListComponent implements OnInit {
  allIngredients: Observable<any> | null = null;
  constructor(private ingredientService: IngredientService) {}
  ngOnInit(): void {
    this.allIngredients = this.ingredientService
      .getAllIngredients()
      .pipe(tap((data) => console.log('essa', data)));
  }
}
