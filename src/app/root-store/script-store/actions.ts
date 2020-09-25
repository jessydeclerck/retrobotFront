import {createAction, props} from "@ngrx/store";
import {CellCoordinates} from "../../shared/models/cell-coordinates";
import {LoadedScript} from "../../shared/models/loaded-script";

export const changeSelectedResources = createAction(
  '[script] change resources',
  props<{resources: any[]}>()
);

export const changeStartMap = createAction(
  '[script] change start map',
  props<{newMapId: CellCoordinates}>()
);

export const changeBankMap = createAction(
  '[script] change bank map',
  props<{newMapId: CellCoordinates}>()
);

export const addMapToPath = createAction(
  '[Script] add map to path',
  props<{newMap: any}>()
);

export const addMapToBankPath = createAction(
  '[Script] add map to bank path',
  props<{newMap: any}>()
);

export const changeCharacterName = createAction(
  '[script] change character name',
  props<{newName: string}>()
);

export const changeScriptName = createAction(
  '[script] change script name',
  props<{newName: string}>()
);

export const receiveScripts = createAction(
  '[scripts] New script list',
  props<{newScripts: LoadedScript[]}>()
);

export const loadScript = createAction(
  '[script] Load',
  props<{script: LoadedScript}>()
);

