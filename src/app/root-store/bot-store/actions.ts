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

export const sendHarvestOrder = createAction(
  '[BotConfiguration] Get',
  props<{harvestOrder: HarvestOrder}>()
);
