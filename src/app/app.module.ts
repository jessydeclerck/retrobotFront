import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreModule} from "./core/core.module";
import {RootStoreModule} from "./root-store/root-store.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DiscordInterceptor} from "./core/interceptors/discord.interceptor";

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreModule,
        RootStoreModule,
        HttpClientModule,
    ],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: DiscordInterceptor,
      multi: true,
    }],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
