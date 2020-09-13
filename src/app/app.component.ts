import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "./root-store";
import {BotStoreAction} from "./root-store/bot-store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor (private readonly store: Store<RootStoreState.State>) {
  }
  title = 'retrobot';

  ngOnInit(): void {
    this.store.dispatch(BotStoreAction.getConfiguration());
  }
}
