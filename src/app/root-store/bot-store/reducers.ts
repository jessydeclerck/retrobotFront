import {createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import * as actions from './actions';

export const BotReducer = createReducer(
  initialState,
  on(actions.addOrRemoveMessageAlert, (state, action) => ({
    ...state,
    messageAlerts: addOrRemoveMessageAlert(state.messageAlerts, action.messageType)
  })),
  on(actions.startGathering, (state, action) => ({
    ...state,
    activityLogs: [...state.activityLogs, `Récolte de la ressource ${action.gatheringNotif.resource}`],
    looting: action.gatheringNotif.resource
  })),
  on(actions.stopGathering, (state, action) => ({
    ...state,
    loot: setNewLoot(state.loot, state.looting, action.gatheredNotif.amount),
    activityLogs: [...state.activityLogs, `Quantité récoltée ${action.gatheredNotif.amount}`],
    looting: null
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

function setNewLoot(currentLoot: any, currentlyLooting: number, amount: number): any {
  const newLoot = {...currentLoot};
  newLoot[currentlyLooting] =  newLoot[currentlyLooting] ?  newLoot[currentlyLooting] + amount : amount;
  return newLoot;
}
