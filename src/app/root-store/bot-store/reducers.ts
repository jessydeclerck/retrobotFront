import {createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import * as actions from './actions';

export function BotReducer (state, action) {
  return _BotReducer(state, action);
}

const _BotReducer = createReducer(
  initialState,
  on(actions.newConfiguration, (state, action) => ({
    ...state,
    configuration: action.configuration,
    activityLogs: [],
  })),
);
