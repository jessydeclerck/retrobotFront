import {BotConfiguration} from "../../shared/models/bot-configuration";

export interface State {
  configuration: BotConfiguration;
  activityLogs: string[];
  messageAlerts: string[];
}

export const initialState: State = {
  configuration: null,
  activityLogs: [],
  messageAlerts: [],
}
