import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {WebsocketService} from "../../shared/services/websocket.service";

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.scss']
})
export class ExecutionComponent implements OnInit {

  constructor(private websocket: WebsocketService) { }

  ngOnInit(): void {
  }

  public stopBot(): void {
    this.websocket.sendMessage(JSON.stringify({type: 'stop'}));
  }
}
