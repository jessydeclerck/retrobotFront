import {Injectable} from "@angular/core";
import {BotApiService} from "../../shared/services/bot-api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import * as actions from './actions';
import {mergeMap, switchMap, tap} from "rxjs/operators";
import {WebsocketService} from "../../shared/services/websocket.service";
import {url} from "../../shared/constants";

@Injectable()
export class BotEffects {
  constructor(private action$: Actions,
              private botApiService: BotApiService,
              private websocketService: WebsocketService) {}

  getConfiguration$ = createEffect( () =>
    this.action$.pipe(
      ofType(actions.getConfiguration),
      mergeMap(action =>
      this.botApiService.getCurrentConfiguration()
        .pipe(
          switchMap(configuration => [
            actions.newConfiguration({configuration}),
            actions.subscribeToLogs()
          ])
        )
      )
  ));

  subscribeToLogs$ = createEffect(() =>
    this.action$.pipe(
      ofType(actions.subscribeToLogs),
      tap(() =>
        this.websocketService.initWebSocket().then(() => {
          this.websocketService
            .subscribe(url.serverNotification, (event) => {
              actions.newLog({log: event.body})
            });
        })
      )
  ));
}
