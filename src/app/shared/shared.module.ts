import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MapContainerComponent} from "./map-container/map-container.component";
import {DragScrollModule} from "ngx-drag-scroll";



@NgModule({
  declarations: [MapContainerComponent],
  imports: [
    CommonModule,
    DragScrollModule,
  ],
  exports: [MapContainerComponent]
})
export class SharedModule { }
