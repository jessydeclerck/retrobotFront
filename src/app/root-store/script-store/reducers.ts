import {createReducer, on} from "@ngrx/store";
import * as actions from "./actions";
import {initialState} from "./state";

export const ScriptReducer = createReducer(
  initialState,
  on(actions.changeSelectedResources, (state, action) => ({
  ...state,
  toGather: action.resources,
})),
  on(actions.changeStartMap, (state, action) => ({
    ...state,
    startMap: action.newMapId
  })),
  on(actions.changeBankMap, (state, action) => ({
    ...state,
    bankMap: action.newMapId
  })),
  on(actions.addMapToBankPath, (state, action) => ({
    ...state,
    bankPath: {...state.bankPath, ...action.newMap}
  })),
  on(actions.addMapToPath, (state, action) => ({
    ...state,
    gatherPath: {...state.gatherPath, ...action.newMap}
  })),
)
