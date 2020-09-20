import {State} from "../state";

export const selectToGather = (state: State) => state.script.toGather;

export const selectStartMap = (state: State) => state.script.startMap;

export const selectBankMap = (state: State) => state.script.bankMap;

export const selectBankPath = (state: State) => state.script.bankPath;

export const selectGatherPath = (state: State) => state.script.gatherPath;



