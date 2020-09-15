import {BotConfiguration} from "../../shared/models/bot-configuration";

export interface State {
  webSocket: WebSocket;
  configuration: BotConfiguration;
  activityLogs: string[];
  messagesQueue: string[];
}

export const initialState: State = {
  webSocket: null,
  configuration: null,
  activityLogs: [],
  messagesQueue: []
}
