import {createAction, props} from "@ngrx/store";
import {NewIncomingMessage} from "../../shared/models/socket-messages/new-incoming-message";


export const handleMessage = createAction(
   '[Communication] new incoming Message',
  props<{newMessage: NewIncomingMessage}>()
);

export const addOrRemoveMessageAlert = createAction(
  '[Message Alert] Add or Remove',
  props<{messageType: string}>()
);

export const alertUser = createAction(
  '[UI] Alert User',
  props<{alert: string}>()
);

export const doNothing = createAction(
  '[UI] Do Nothing',
);

