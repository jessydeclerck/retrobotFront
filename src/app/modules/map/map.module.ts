import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';
import { MapContainerComponent } from './map-container/map-container.component';


@NgModule({
  declarations: [MapComponent, MapContainerComponent],
  imports: [
    CommonModule,
    MapRoutingModule
  ]
})
export class MapModule { }
