import {createAction, props} from "@ngrx/store";


export const handleMessage = createAction(
   '[Communication] new incoming Message',
  props<{message: any}>()
);
