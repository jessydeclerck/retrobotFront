import {CellCoordinates} from "../../shared/models/cell-coordinates";
import {BotConfiguration} from "../../shared/models/bot-configuration";
import {LoadedScript} from "../../shared/models/loaded-script";

export interface State {
  toGather: string[];
  startMap: CellCoordinates;
  bankMap: CellCoordinates;
  gatherPath: any;
  bankPath: any;
  scriptName: string;
  characterName: string;
  scripts: LoadedScript[];
  isPaysan: boolean;
}

export const initialState: State = {
  toGather: [],
  startMap: null,
  bankMap: null,
  gatherPath: {},
  bankPath: {},
  scriptName: '',
  characterName: '',
  scripts: [],
  isPaysan: false,
}

