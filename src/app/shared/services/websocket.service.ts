import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {BotStoreActions} from "../../root-store/bot-store";
import {NewIncomingMessage} from "../models/socket-messages/new-incoming-message";
import {Gathering} from "../models/socket-messages/gathering";
import {Gathered} from "../models/socket-messages/gathered";
import {NewMap} from "../models/socket-messages/new-map";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;

  constructor(private readonly store: Store<RootStoreState.State>) {
    this.webSocket = new WebSocket(environment.localBot);
    this.webSocket.onmessage = this.handleMessage;
  }

  public sendMessage(message: any) {
    this.webSocket.send(message);
  }

  public handleMessage = (message) => {
    const parsedMessage = JSON.parse(message.data);
    console.log(parsedMessage);
    switch (parsedMessage.type) {
      case 'message':
        const newMessage = new NewIncomingMessage(parsedMessage);
        this.store.dispatch(BotStoreActions.handleMessage({newMessage}));
        break;
      case 'gathering':
        const gatheringNotif = new Gathering(parsedMessage);
        this.store.dispatch(BotStoreActions.startGathering({gatheringNotif}));
        break;
      case 'gathered':
        const gatheredNotif = new Gathered(parsedMessage);
        this.store.dispatch(BotStoreActions.stopGathering({gatheredNotif}));
        break;
      case 'map':
        const newMapNotif = new NewMap(parsedMessage);
        this.store.dispatch(BotStoreActions.newMap({newMapNotif}));
        break;
      default:
        alert(`Pouvez-vous transmettre aux dev que la petite chaussette ${parsedMessage.type} est cassée SVP ?`);
    }

  }

}


