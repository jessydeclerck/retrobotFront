import {BotConfiguration} from "../../shared/models/bot-configuration";
import {CellCoordinates} from "../../shared/models/cell-coordinates";

export interface State {
  activityLogs: string[];
  messageAlerts: string[];
  discordId: number;
  looting?: number;
  coordinates: CellCoordinates;
  loot: any;
}

export const initialState: State = {
  activityLogs: [],
  messageAlerts: [],
  discordId: null,
  loot: {},
  coordinates: null,
}
