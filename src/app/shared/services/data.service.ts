import {Injectable} from '@angular/core';
import {BotConfiguration} from "../models/bot-configuration";
import {CellCoordinates} from "../models/cell-coordinates";
import {mapId} from "../constants/mapId";
import {WebsocketService} from "./websocket.service";
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly websocket: WebsocketService) {
  }

  public exportScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any, characterName: string, scriptName: string): void{
    const toExport = {
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
    const fileName = `${toExport.scriptName}.json`
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
    return {
      toGather,
      characterName,
      bankMapId: mapId[`${bankMap.x},${bankMap.y}`],
      startMapId: mapId[`${startMap.x},${startMap.y}`],
      gatherPath: this.preparePath(gatherPath, mapId),
      bankPath: this.preparePath(bankPath, mapId),
    };
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
