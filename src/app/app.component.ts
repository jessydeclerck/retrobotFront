import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "./root-store";
import {BotStoreAction} from "./root-store/bot-store";
import {WebsocketService} from "./shared/services/websocket.service";
import {url} from "./shared/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor (private webSocketService :WebsocketService) {
  }
  title = 'retrobot';

  ngOnInit(): void {
    this.webSocketService.initWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

}
