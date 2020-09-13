import {Injectable} from "@angular/core";
import {BotApiService} from "../../shared/services/bot-api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";

import * as actions from './actions';
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {configuration} from "../../shared/constants/url";

@Injectable()
export class BotEffects {
  constructor(private action$: Actions, private botApiService: BotApiService) {}

  getConfiguration$ = createEffect( () =>
  this.action$.pipe(
    ofType(actions.getConfiguration),
    mergeMap(action =>
    this.botApiService.getCurrentConfiguration()
      .pipe(
        map(configuration => actions.newConfiguration({configuration}))
      )
    )
  ))
}
