import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private websocket: WebSocket;

  constructor() { }

  public initWebSocket (): void {
    this.websocket = new WebSocket('ws://localhost:8080');
  }

  public closeWebSocket (): void {
    this.websocket.close();
  }


}

