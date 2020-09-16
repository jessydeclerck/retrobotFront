import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionRoutingModule } from './execution-routing.module';
import { ExecutionComponent } from './execution.component';
import { MessageAlertComponent } from './message-alert/message-alert.component';
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [ExecutionComponent, MessageAlertComponent],
  imports: [
    CommonModule,
    ExecutionRoutingModule,
    MatChipsModule,
  ]
})
export class ExecutionModule { }
