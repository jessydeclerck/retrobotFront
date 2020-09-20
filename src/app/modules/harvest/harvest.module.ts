import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestRoutingModule } from './harvest-routing.module';
import { HarvestComponent } from './harvest.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import { HarvestControlPanelComponent } from './components/harvest-control-panel/harvest-control-panel.component';


@NgModule({
  declarations: [HarvestComponent, HarvestControlPanelComponent],
  imports: [
    CommonModule,
    HarvestRoutingModule,
    MatTabsModule,
    MatListModule,
    FormsModule,
  ]
})
export class HarvestModule { }
