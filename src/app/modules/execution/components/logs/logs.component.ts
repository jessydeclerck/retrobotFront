import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {BotStoreSelectors} from "../../../../root-store/bot-store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  public logs$: Observable<string[]> = this.store.select(BotStoreSelectors.logs);

  constructor(private readonly store: Store<RootStoreState.State>) { }

  ngOnInit(): void {
  }

}
