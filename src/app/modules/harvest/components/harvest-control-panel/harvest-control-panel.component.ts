import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {resourcesData} from "../../../../shared/constants/resourcesData";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {Observable} from "rxjs";
import {BotStoreActions, BotStoreSelectors} from "../../../../root-store/bot-store";
import {ScriptStoreActions, ScriptStoreSelectors} from "../../../../root-store/script-store";

@Component({
  selector: 'app-harvest-control-panel',
  templateUrl: './harvest-control-panel.component.html',
  styleUrls: ['./harvest-control-panel.component.scss']
})
export class HarvestControlPanelComponent implements OnInit {

  @Input()
  job: string;

  resourcesToHarvest$: Observable<any[]> = this.store.select(ScriptStoreSelectors.selectToGather);

  @Output()
  resourcesToHarvestChange = new EventEmitter();

  public resources: any = {}

  constructor(private readonly store: Store<RootStoreState.State>) { }

  public newResourcesToHarvest(event) {
    this.store.dispatch(ScriptStoreActions.changeSelectedResources({resources: event}));
  }

  ngOnInit(): void {
    Object.keys(resourcesData).forEach(resId => {
      if (resourcesData[resId].metier.includes(this.job)){
        this.resources[resId] = resourcesData[resId];
      }
    });
  }

}
