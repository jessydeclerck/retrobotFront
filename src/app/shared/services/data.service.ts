import {Injectable} from '@angular/core';
import {BotConfiguration} from "../models/bot-configuration";
import {CellCoordinates} from "../models/cell-coordinates";
import {mapId} from "../constants/mapId";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  public useScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any): void {
    const script = this.prepareScript(toGather, bankMap, startMap, gatherPath, bankPath);
    console.log(JSON.stringify(script));
  }

  private prepareScript(toGather: string[], bankMap: CellCoordinates, startMap: CellCoordinates, gatherPath: any, bankPath: any): BotConfiguration {
    return {
      toGather,
      bankMapId: mapId[`${bankMap.x},${bankMap.y}`],
      startMapId: mapId[`${startMap.x},${startMap.y}`],
      gatherPath: this.preparePath(gatherPath, mapId),
      bankPath: this.preparePath(bankPath, mapId),
    };
  }

  preparePath(path: any, mapId: any): any {
    console.log(mapId);
    const preparedPath = {};
    Object.keys(path).forEach(map => {
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
    });
    return preparedPath;
  }
}
