import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from "./shared/services/websocket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor (private readonly webSocketService: WebsocketService) {
  }
  title = 'retrobot';

  ngOnInit(): void {
    setTimeout(() => {
      this.webSocketService.sendMessage('aaa')
    }, 1500);

  }

  ngOnDestroy(): void {

  }

}
