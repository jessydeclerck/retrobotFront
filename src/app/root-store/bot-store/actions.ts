import {createAction, props} from "@ngrx/store";
import {NewIncomingMessage} from "../../shared/models/socket-messages/new-incoming-message";
import {Gathering} from "../../shared/models/socket-messages/gathering";
import {Gathered} from "../../shared/models/socket-messages/gathered";
import {NewMap} from "../../shared/models/socket-messages/new-map";


export const handleMessage = createAction(
   '[Communication] new incoming Message',
  props<{newMessage: NewIncomingMessage}>()
);

export const addOrRemoveMessageAlert = createAction(
  '[Message Alert] Add or Remove',
  props<{messageType: string}>()
);

export const startGathering = createAction(
  '[Communication] Start Gathering',
  props<{gatheringNotif: Gathering}>()
);

export const stopGathering = createAction(
  '[Communication] Stop Gathering',
  props<{gatheredNotif: Gathered}>()
);

export const newMap = createAction(
  '[Communication] Entered New Map',
  props<{newMapNotif: NewMap}>()
)






export const alertUser = createAction(
  '[UI] Alert User',
  props<{alert: string}>()
);

export const doNothing = createAction(
  '[UI] Do Nothing',
);

