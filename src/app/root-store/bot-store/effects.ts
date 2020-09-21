import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType,} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../index";
import * as actions from './actions';
import {catchError, exhaustMap, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {BotStoreSelectors} from "./index";
import {MessageType} from "../../shared/enums/message-type.enum";
import {discordId} from "./selectors";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class BotEffects {
  constructor(private action$: Actions,
              private http: HttpClient,
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
    withLatestFrom(this.store.select(BotStoreSelectors.discordId)),
    map(([action, discordId]) => {
      if (discordId) {
        return actions.alertUserWithDiscord({alert: action.alert, discordId: discordId});
      } else {
        return actions.doNothing();
      }
    })
  ));

  alertUserWithDiscord$ = createEffect(() =>
    this.action$.pipe(
      ofType(actions.alertUserWithDiscord),
      mergeMap(action =>
        this.http.post<any>(`${environment.retrobotDiscordUrl}/api/dm/sendMessage`,
          JSON.stringify({userId: action.discordId.toString(), messageContent: action.alert}))
          .pipe(
            map(attributesGroups => actions.alertUserWithInNavigator({alert: action.alert})),
            catchError(error => of(actions.doNothing()))
          )
        )
      )
    );

  alertUserInNavigator$ = createEffect(() =>
    this.action$.pipe(
      ofType(actions.alertUserWithInNavigator),
      tap((action) => alert(action.alert))
    ), {dispatch: false});

}
