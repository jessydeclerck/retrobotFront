import {createAction, props} from "@ngrx/store";
import {CellCoordinates} from "../../shared/models/cell-coordinates";

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
