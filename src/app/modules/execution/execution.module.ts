import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionRoutingModule } from './execution-routing.module';
import { ExecutionComponent } from './execution.component';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';
import {MatChipsModule} from "@angular/material/chips";
import { LootComponent } from './components/loot/loot.component';
import { LogsComponent } from './components/logs/logs.component';
import {SharedModule} from '../../shared/shared.module';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [ExecutionComponent, MessageAlertComponent, LootComponent, LogsComponent],
  imports: [
    CommonModule,
    ExecutionRoutingModule,
    MatChipsModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class ExecutionModule { }
