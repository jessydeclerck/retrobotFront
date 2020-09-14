import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "./root-store";
import {BotStoreAction} from "./root-store/bot-store";
import {WebsocketService} from "./shared/services/websocket.service";
import {url} from "./shared/constants";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private webSocketService :WebsocketService) {
  }
  title = 'retrobot';

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:80');

  ngOnInit(): void {
    this.myWebSocket.subscribe(
      msg => console.log('message received: ' + msg),
      err => console.log(err),
      () => console.log('complete')
    );
    this.myWebSocket.next({message: 'some message'});
  }

}
