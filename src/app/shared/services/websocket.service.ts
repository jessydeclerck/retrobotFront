import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {BotStoreActions} from "../../root-store/bot-store";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;

  constructor(private readonly store: Store<RootStoreState.State>) {
    this.webSocket = new WebSocket('ws://localhost:80');
    this.webSocket.onmessage = this.handleMessage;
  }

  public sendMessage(message: any) {
    this.webSocket.send(message);
  }

  private handleMessage = (message) => {
    this.store.dispatch(BotStoreActions.handleMessage({message}));
  }

}


