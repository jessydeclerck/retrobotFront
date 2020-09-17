import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType,} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../index";
import * as actions from './actions';
import {map, tap, withLatestFrom} from "rxjs/operators";
import {BotStoreSelectors} from "./index";
import {MessageType} from "../../shared/enums/message-type.enum";

@Injectable()
export class BotEffects {
  constructor(private action$: Actions,
              private readonly store: Store<RootStoreState.State>) {}

  handleMessage$ = createEffect( () =>
  this.action$.pipe(
    ofType(actions.handleMessage),
    withLatestFrom(this.store.select(BotStoreSelectors.selectMessageAlert)),
    map(([action, messageAlert]) => {
      if (messageAlert.includes(action.newMessage.messageType)) {
        return actions.alertUser({alert: `Message ${MessageType[action.newMessage.messageType]} de ${action.newMessage.from} : ${action.newMessage.content}`});
      } else {
        return actions.doNothing();
      }
    })
  ));

  alertUser$ = createEffect(() =>
  this.action$.pipe(
    ofType(actions.alertUser),
    tap((action) => alert(action.alert))
  ), {dispatch: false});


}
