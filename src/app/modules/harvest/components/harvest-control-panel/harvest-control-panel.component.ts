import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {resourcesData} from "../../../../shared/constants/resourcesData";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {Observable} from "rxjs";
import {ScriptStoreActions, ScriptStoreSelectors} from "../../../../root-store/script-store";

@Component({
  selector: 'app-harvest-control-panel',
  templateUrl: './harvest-control-panel.component.html',
  styleUrls: ['./harvest-control-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
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
