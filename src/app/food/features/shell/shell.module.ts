import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FoodMainComponent } from '../food-main/food-main.component'

const router: Routes = [
  {
    path: '',
    component: FoodMainComponent,
    children: [
      {
        path: 'ingredients',
        loadComponent: () =>
          import('../ingredients-list/ingredients-list.component').then(
            (m) => m.IngredientsListComponent
          ),
      },
      {
        path: 'dishes',
        loadComponent: () =>
          import('../dishes-list/dishes-list.component').then(
            (m) => m.DishesListComponent
          ),
      },
      {
        path: 'dishes/:id/details',
        loadComponent: () =>
          import('../dish-details/dish-details.component').then(
            (m) => m.DishDetailsComponent
          ),
      },
      { path: '**', redirectTo: 'ingredients', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class ShellModule {}
