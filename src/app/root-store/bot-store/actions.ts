import {createAction, props} from "@ngrx/store";
import {BotConfiguration} from "../../shared/models/bot-configuration";
import {HarvestOrder} from "../../shared/models/harvest-order";

export const getConfiguration = createAction(
  '[BotConfiguration] Get'
);

export const newConfiguration = createAction(
  '[BotConfiguration] New',
  props<{configuration: BotConfiguration}>()
);

export const subscribeToLogs = createAction(
  '[Log] Subscribe Logs'
);

export const newLog = createAction(
  '[Log] New Logs',
  props<{log: string}>()
);

export const sendHarvestOrder = createAction(
  '[Bot] Harvest',
  props<{harvestOrder: HarvestOrder}>()
);
