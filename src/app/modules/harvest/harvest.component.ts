import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "../../shared/services/websocket.service";
import {socket} from "../../shared/constants";


@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.scss']
})
export class HarvestComponent implements OnInit, OnDestroy {

  constructor(private readonly websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.initWebSocket().then(() => {
      this.websocketService
        .subscribe(socket.harvestNotification, (event) => {

      });
    });
  }

  ngOnDestroy(): void {
    this.websocketService.unsubscribeToWebSocketEvent(socket.harvestNotification);
  }

}
