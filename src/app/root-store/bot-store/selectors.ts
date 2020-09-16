import {State} from "../state";

export const selectMessageAlert = (state: State) => state.bot.messageAlerts;

