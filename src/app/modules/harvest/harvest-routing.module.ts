import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HarvestComponent} from "./harvest.component";


const routes: Routes = [
  {
    path: '',
    component: HarvestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarvestRoutingModule { }
