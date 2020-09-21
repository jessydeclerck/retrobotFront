import { Component, OnInit } from '@angular/core';
import {MessageType} from "../../../../shared/enums/message-type.enum";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {BotStoreActions, BotStoreSelectors} from "../../../../root-store/bot-store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent implements OnInit {

  public messageTypes = MessageType;

  public isEditingDiscordId = false;
  public discordId;

  public selectedAlerts$: Observable<string[]> = this.store.select(BotStoreSelectors.selectMessageAlert);

  constructor(private readonly store: Store<RootStoreState.State>) { }

  ngOnInit(): void {
    this.store.select(BotStoreSelectors.discordId).subscribe( discordId => {
      this.discordId = discordId;
    });
  }

  AlertMessageType(messageType: string) {
    this.store.dispatch(BotStoreActions.addOrRemoveMessageAlert({messageType}))
  }

  editDiscordId() {
    if (this.isEditingDiscordId){
      this.store.dispatch(BotStoreActions.editDiscordId({discordId: this.discordId}));
    }
    this.isEditingDiscordId = !this.isEditingDiscordId;
  }

}
