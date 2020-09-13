import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestRoutingModule } from './harvest-routing.module';
import { HarvestComponent } from './harvest.component';


@NgModule({
  declarations: [HarvestComponent],
  imports: [
    CommonModule,
    HarvestRoutingModule
  ]
})
export class HarvestModule { }
