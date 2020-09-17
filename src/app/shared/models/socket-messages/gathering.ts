export class Gathering {
  resource: number;

  constructor(parsedMessage) {
    this.resource = parsedMessage.resource;
  }

}
