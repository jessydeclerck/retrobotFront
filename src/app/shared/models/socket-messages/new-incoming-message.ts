import {MessageType} from "../../enums/message-type.enum";


export class NewIncomingMessage{
  from: string;
  content: string;
  messageType: string

  constructor(parsedMessage) {
    this.from = parsedMessage.from;
    this.content = parsedMessage.content;
    this.messageType = parsedMessage.messageType;
  }

  getAlert(): string {
    return `Nouveau message ${MessageType[this.messageType]} de ${this.from} contenant ${this.content}`;
  }
}
