import {BotStoreState} from "./bot-store";
import {ScriptStoreState} from "./script-store";

export interface State {
  bot: BotStoreState.State;
  script: ScriptStoreState.State;
}
