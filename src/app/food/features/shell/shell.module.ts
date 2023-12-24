import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodHomeComponent } from '../food-home/food-home.component';

const router: Routes = [
  {
    path: '',
    component: FoodHomeComponent,
    children: [
      {
        path: 'ingredients',
        loadComponent: () =>
          import('../ingredients-list/ingredients-list.component').then(
            m => m.IngredientsListComponent
          ),
      },
      {
        path: 'dishes',
        loadComponent: () =>
          import('../dishes-list/dishes-list.component').then(
            m => m.DishesListComponent
          ),
      },
      {
        path: 'dishes/:id/details',
        loadComponent: () =>
          import('../dish-details/dish-details.component').then(
            m => m.DishDetailsComponent
          ),
      },
      {
        path: 'ingredients/:id/details',
        loadComponent: () =>
          import('../ingredient-details/ingredient-details.component').then(
            m => m.IngredientDetailsComponent
          ),
      },

      { path: '**', redirectTo: 'ingredients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class ShellModule {}
