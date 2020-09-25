import {CellCoordinates} from "./cell-coordinates";

export interface BotConfiguration {
  toGather: string[];
  startMapId: CellCoordinates;
  characterName: string;
  bankMapId: CellCoordinates;
  gatherPath: any;
  bankPath: any;
}
