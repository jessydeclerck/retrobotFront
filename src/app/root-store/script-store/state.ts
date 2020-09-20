import {CellCoordinates} from "../../shared/models/cell-coordinates";

export interface State {
  toGather: string[];
  startMap: CellCoordinates;
  bankMap: CellCoordinates;
  gatherPath: any;
  bankPath: any;
}

export const initialState: State = {
  toGather: [],
  startMap: null,
  bankMap: null,
  gatherPath: {},
  bankPath: {}
}

