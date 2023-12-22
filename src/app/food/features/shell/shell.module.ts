import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

const router: Routes = [
  {

    path: 'ingredients',
    loadComponent: () =>
      import('../ingredients-list/ingredients-list.component').then(
        (m) => m.IngredientsListComponent
      ),
  },
  { path: '**', redirectTo: 'ingredients' },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
})
export class ShellModule {}
