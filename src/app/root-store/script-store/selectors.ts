import {State} from "../state";

export const selectToGather = (state: State) => state.script.toGather;

export const selectStartMap = (state: State) => state.script.startMap;

export const selectBankMap = (state: State) => state.script.bankMap;

export const selectBankPath = (state: State) => state.script.bankPath;

export const selectGatherPath = (state: State) => state.script.gatherPath;

export const selectCharacterName = (state: State) => state.script.characterName;

export const selectScriptName = (state: State) => state.script.scriptName;

export const selectLoadedScripts = (state: State) => state.script.scripts;



