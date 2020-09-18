import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'harvest',
    loadChildren: () => import('./modules/harvest/harvest.module').then(m => m.HarvestModule),
  },
  {
    path: 'run',
    loadChildren: () => import('./modules/execution/execution.module').then(m => m.ExecutionModule),
  },
  {
    path: 'map',
    loadChildren: () => import('./modules/map/map.module').then(m => m.MapModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
