import {State} from "../state";

export const selectMessageAlert = (state: State) => state.bot.messageAlerts;

export const looting = (state: State) => state.bot.looting;

export const loot = (state: State) => state.bot.loot;

export const logs = (state: State) => state.bot.activityLogs;

