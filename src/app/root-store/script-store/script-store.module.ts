import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {ScriptReducer} from "./reducers";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('script', ScriptReducer),
  ]
})
export class ScriptStoreModule { }
