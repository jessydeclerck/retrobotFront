import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import { BotReducer } from './reducers';
import {BotEffects} from "./effects";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('bot', BotReducer),
    EffectsModule.forRoot([BotEffects])
  ]
})
export class BotStoreModule { }
