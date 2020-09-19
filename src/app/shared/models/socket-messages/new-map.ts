export class NewMap {
  x: number;
  y: number;

  constructor(parsedMessage) {
    this.x = parsedMessage.x;
    this.y = parsedMessage.y;
  }
}
