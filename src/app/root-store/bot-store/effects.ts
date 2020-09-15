import {Injectable} from "@angular/core";
import {Actions, } from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../index";

@Injectable()
export class BotEffects {
  constructor(private action$: Actions,
              private readonly store: Store<RootStoreState.State>) {}


}
