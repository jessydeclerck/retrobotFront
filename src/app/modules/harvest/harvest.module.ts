import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestRoutingModule } from './harvest-routing.module';
import { HarvestComponent } from './harvest.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [HarvestComponent],
    imports: [
        CommonModule,
        HarvestRoutingModule,
        MatTabsModule
    ]
})
export class HarvestModule { }
