import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvestRoutingModule } from './harvest-routing.module';
import { HarvestComponent } from './harvest.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HarvestControlPanelComponent } from './components/harvest-control-panel/harvest-control-panel.component';
import { MapBuilderComponent } from './components/map-builder/map-builder.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [HarvestComponent, HarvestControlPanelComponent, MapBuilderComponent],
    imports: [
        CommonModule,
        HarvestRoutingModule,
        MatTabsModule,
        MatListModule,
        MatButtonToggleModule,
        FormsModule,
        SharedModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatExpansionModule,
    ]
})
export class HarvestModule { }
