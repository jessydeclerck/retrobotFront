import {createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import * as actions from './actions';
import {MessageType} from "../../shared/enums/message-type.enum";

export const BotReducer = createReducer(
  initialState,
  on(actions.addOrRemoveMessageAlert, (state, action) => ({
    ...state,
    messageAlerts: addOrRemoveMessageAlert(state.messageAlerts, action.messageType)
  }))
);

function addOrRemoveMessageAlert(alerts: string[], newAlert: string): string[] {
  let newAlerts = [...alerts];
  const index = newAlerts.indexOf(newAlert);
  if (index < 0) {
    newAlerts.push(newAlert);
  } else {
    newAlerts.splice(index, 1);
  }
  return newAlerts;
}
