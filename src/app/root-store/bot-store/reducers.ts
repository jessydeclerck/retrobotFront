import {createReducer, on} from "@ngrx/store";
import {initialState} from "./state";
import * as actions from './actions';

export const BotReducer = createReducer(
  initialState,

);
