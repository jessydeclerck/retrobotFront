import {State} from "../state";

export const selectToGather = (state: State) => state.script.toGather;

export const selectStartMap = (state: State) => state.script.startMap;

export const selectBankMap = (state: State) => state.script.bankMap;



