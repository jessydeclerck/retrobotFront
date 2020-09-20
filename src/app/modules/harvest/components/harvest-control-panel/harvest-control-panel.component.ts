import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {resourcesData} from "../../../../shared/constants/resourcesData";

@Component({
  selector: 'app-harvest-control-panel',
  templateUrl: './harvest-control-panel.component.html',
  styleUrls: ['./harvest-control-panel.component.scss']
})
export class HarvestControlPanelComponent implements OnChanges {

  @Input()
  job: string;

  selectedResources = [];

  public resources: any = {}

  constructor() { }

  ngOnChanges(): void {
    this.resources = {};
    this.selectedResources = [];
    Object.keys(resourcesData).forEach(resId => {
      if (resourcesData[resId].metier.includes(this.job)){
        this.resources[resId] = resourcesData[resId];
      }
    });
  }

}
