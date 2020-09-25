import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {BotStoreActions} from "../../root-store/bot-store";
import {NewIncomingMessage} from "../models/socket-messages/new-incoming-message";
import {Gathering} from "../models/socket-messages/gathering";
import {Gathered} from "../models/socket-messages/gathered";
import {NewMap} from "../models/socket-messages/new-map";
import {environment} from "../../../environments/environment";
import {ScriptStoreActions} from "../../root-store/script-store";
import {BotConfiguration} from "../models/bot-configuration";
import {LoadedScript} from "../models/loaded-script";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;

  constructor(private readonly store: Store<RootStoreState.State>) {
    this.connect()
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
      case 'scripts':
        const newScripts: LoadedScript[] = this.parseLoadedScripts(parsedMessage.scripts);
        this.store.dispatch(ScriptStoreActions.receiveScripts({newScripts}));
        break;
      default:
        alert(`Pouvez-vous transmettre aux dev que la petite chaussette ${parsedMessage.type} est cassée SVP ?`);
    }

  }

  private connect = () => {
    this.webSocket = new WebSocket(environment.localBot);
    this.webSocket.onmessage = this.handleMessage;
    this.webSocket.onopen = () => console.log("Websocket connected");
    this.webSocket.onclose = () => {
      console.log("Websocket closed, reconnect attempt...");
      setTimeout(() => this.connect(), 2000);
    }
  }

  private parseLoadedScripts(parsedScripts): LoadedScript[] {
    const scripts: LoadedScript[] = [];
    parsedScripts.forEach((parsedScript) => {
      const script: LoadedScript = new class implements LoadedScript {
        data: any;
        characterName: string;
        scriptName: string;
      };
      script.scriptName = parsedScript.scriptName.split('.json')[0];
      script.data = parsedScript.script.displayData;
      script.characterName = parsedScript.script.characterName;
      scripts.push(script);
    });
    return scripts;
  }

}


