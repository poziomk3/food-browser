import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import {
  IngredientService,
  Product,
} from '../../data-access/ingredient.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.service';

@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe,MaterialModule],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss',
})
export class IngredientsListComponent implements OnInit {
  allIngredients: Observable<Array<Product>> | null = null;
  pictures: { [key: number]: Observable<string> } = {};
  constructor(private ingredientService: IngredientService) {}
  ngOnInit(): void {
    this.allIngredients = this.ingredientService
      .getAllIngredients()
      .pipe
      // tap((data) =>
      //   data.map(
      //     (ingredient) =>
      //       (this.pictures[ingredient.idIngredient] =
      //         this.ingredientService.getIngredientPicture(
      //           ingredient.strIngredient
      //         ))
      //   )
      // )
      ();
  }
}
