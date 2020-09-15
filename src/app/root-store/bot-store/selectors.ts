import {State} from "./state";

export const selectMessageQueue = (state: State) => state.messagesQueue;

export const selectWebSocket = (state: State) => state.webSocket;
