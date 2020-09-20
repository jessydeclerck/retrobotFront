import {Component, OnDestroy, OnInit} from '@angular/core';
import {Jobs} from "../../shared/enums/jobs.enum";
import {resourcesData} from "../../shared/constants/resourcesData";

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit, OnDestroy {

  public jobs = Jobs;

  public selectedResources=[];


  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }


}
