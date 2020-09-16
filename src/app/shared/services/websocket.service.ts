import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {BotStoreActions} from "../../root-store/bot-store";
import {NewIncomingMessage} from "../models/socket-messages/new-incoming-message";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;

  constructor(private readonly store: Store<RootStoreState.State>) {
    this.webSocket = new WebSocket('ws://localhost:80');
    this.webSocket.onmessage = this.handleMessage;
  }a

  public sendMessage(message: any) {
    this.webSocket.send(message);
  }

  public handleMessage = (message) => {
    const parsedMessage = JSON.parse(message.data);
    switch (parsedMessage.type) {
      case 'message':
        const newMessage = new NewIncomingMessage(parsedMessage)
        console.log(newMessage);
        this.store.dispatch(BotStoreActions.handleMessage({newMessage}));
        console.log('okok')
    }

  }

}


