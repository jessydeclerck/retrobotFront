import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HarvestComponent} from "../harvest/harvest.component";
import {ExecutionComponent} from "./execution.component";

const routes: Routes = [  {
  path: '',
  component: ExecutionComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutionRoutingModule { }
