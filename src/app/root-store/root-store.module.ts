import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../environments/environment";
import { BotStoreModule } from './bot-store/bot-store.module';
import { ScriptStoreModule } from './script-store/script-store.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BotStoreModule,
    ScriptStoreModule,
  ]
})
export class RootStoreModule { }
