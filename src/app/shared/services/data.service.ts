import {Injectable} from '@angular/core';
import {BotConfiguration} from "../models/bot-configuration";
import {CellCoordinates} from "../models/cell-coordinates";
import {mapId} from "../constants/mapId";
import {WebsocketService} from "./websocket.service";
import * as FileSaver from "file-saver";
import {banks} from "../constants/banks";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly websocket: WebsocketService) {
  }

  public exportScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any, characterName: string, scriptName: string): void{
    const toExport = {
      ...this.prepareScript(toGather, bankMap, startMap, gatherPath, bankPath, characterName),
      displayData: {
        toGather,
        startMap,
        bankMap,
        gatherPath,
        bankPath,
      },
    };
    const fileName = `${scriptName}.json`
    const file = new Blob([JSON.stringify(toExport, null, 2)],{
      type: 'application/json',
    });
    FileSaver.saveAs(file, fileName);
  }

  public useScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any, characterName: string, scriptName: string): void {
    const toSend = {
      type: 'script',
      scriptName,
      script: this.prepareScript(toGather, bankMap, startMap, gatherPath, bankPath, characterName),
      displayData: {
        toGather,
        startMap,
        bankMap,
        gatherPath,
        bankPath,
      },
    };
    this.websocket.sendMessage(JSON.stringify(toSend));
  }

  private prepareScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any, characterName: string): BotConfiguration {
    const idBankIn = banks.find(bank => bank.coords.x === bankMap.x && bank.coords.y === bankMap.y).idIn
    const idBankOut = banks.find(bank => bank.coords.x === bankMap.x && bank.coords.y === bankMap.y).idOut
    const script =  {
      toGather,
      characterName,
      bankMapId: idBankIn,
      startMapId: mapId[`${startMap.x},${startMap.y}`],
      gatherPath: this.preparePath(gatherPath, mapId),
      bankPath: {
        ...this.preparePath(bankPath, mapId),
      },
    };
    script.bankPath[idBankIn] = {direction: 'out', nextMapId: idBankOut};
    script.bankPath[idBankOut] = {direction: 'in', nextMapId: idBankIn};
    return script;
  }

  preparePath(path: any, mapId: any): any {
    const preparedPath = {};
    console.log(path);
    Object.keys(path).forEach(map => {
      if(path[map]){
        const mapCoords = map.split(',');
        const nextMap = [parseInt(mapCoords[0]), parseInt(mapCoords[1])];
        switch (path[map].direction) {
          case 'top':
            nextMap[1]--;
            break;
          case 'bottom':
            nextMap[1]++;
            break;
          case 'left':
            nextMap[0]--;
            break;
          case 'right':
            nextMap[0]++;
            break;
          default:
            return null;
        }
        if(!mapId[map]) {
          alert(`il y a un problème avec les informations de la map ${map}, Merci de prévenir les développeurs et de ne pas l'utiliser dans votre script`);
          throw `Pas d'ID pour la map ${map}`;
        }
        preparedPath[mapId[map]] = {
          direction: path[map].direction,
          nextMapId: mapId[`${nextMap[0]},${nextMap[1]}`],
          pos: map,
        }
        if (path[map].gather) {
          preparedPath[mapId[map]].gather = true;
        }
      }
    });
    return preparedPath;
  }
}
