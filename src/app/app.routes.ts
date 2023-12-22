import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: 'food',
    loadChildren: () => import('./food/features/shell/shell.module').then(m => m.ShellModule),
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: 'food'
}
    
];
