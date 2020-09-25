import {createReducer, on} from "@ngrx/store";
import * as actions from "./actions";
import {initialState} from "./state";
import {act} from "@ngrx/effects";

export const ScriptReducer = createReducer(
  initialState,
  on(actions.changeSelectedResources, (state, action) => ({
  ...state,
  toGather: action.resources,
})),
  on(actions.changeStartMap, (state, action) => ({
    ...state,
    startMap: action.newMapId,
  })),
  on(actions.changeBankMap, (state, action) => ({
    ...state,
    bankMap: action.newMapId,
  })),
  on(actions.addMapToBankPath, (state, action) => ({
    ...state,
    bankPath: {...state.bankPath, ...action.newMap},
  })),
  on(actions.addMapToPath, (state, action) => ({
    ...state,
    gatherPath: {...state.gatherPath, ...action.newMap},
  })),
  on(actions.changeScriptName, (state, action) => ({
    ...state,
    scriptName: action.newName,
  })),
  on(actions.changeCharacterName, (state, action) => ({
    ...state,
    characterName: action.newName,
  })),
  on(actions.receiveScripts, (state, action) => ({
    ...state,
    scripts: action.newScripts,
  })),
  on(actions.loadScript, (state, action) => ({
    ...state,
    scriptName: action.script.scriptName,
    bankMap: action.script.data.bankMap,
    startMap: action.script.data.startMap,
    bankPath: action.script.data.bankPath,
    gatherPath: action.script.data.gatherPath,
    characterName: action.script.characterName,
    toGather: action.script.data.toGather,
  }))
)
