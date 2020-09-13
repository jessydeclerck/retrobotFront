import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "../../shared/services/websocket.service";

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

}
