import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {Observable} from "rxjs";
import {BotStoreSelectors} from "../../../../root-store/bot-store";
import { resourcesData } from '../../../../shared/constants/resourcesData';

@Component({
  selector: 'app-loot',
  templateUrl: './loot.component.html',
  styleUrls: ['./loot.component.scss']
})
export class LootComponent implements OnInit {

  public loot$: Observable<any> = this.store.select(BotStoreSelectors.loot);

   public resourcesData = resourcesData;

  public displayedColumns: string[] = ['id', 'amount'];

  constructor(private readonly store: Store<RootStoreState.State>) { }

  ngOnInit(): void {
  }

}
