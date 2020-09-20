import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {BotStoreActions} from "../../../../root-store/bot-store";
import {CellCoordinates} from "../../../../shared/models/cell-coordinates";
import {mapId} from "../../../../shared/constants/mapId";
import {ScriptStoreActions} from "../../../../root-store/script-store";

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.scss']
})
export class MapBuilderComponent {

  public drawPathMode: string;
  public direction: string = 'top';

  constructor(private readonly store: Store<RootStoreState.State>) {
  }

  public onClickOnCell(cell: CellCoordinates): void {
    const newMap = {}
    switch (this.drawPathMode) {
      case 'startMap':
        this.store.dispatch(ScriptStoreActions.changeStartMap({newMapId: cell}));
        break;
      case 'bankMap':
        this.store.dispatch(ScriptStoreActions.changeBankMap({newMapId: cell}));
        break;
      case 'move':
      case 'harvest':
        newMap[`${cell.x};${cell.y}`] = {direction: this.direction, gather: this.drawPathMode === 'harvest'};
        this.store.dispatch(ScriptStoreActions.addMapToPath({newMap}));
        break;
      case 'bank':
        newMap[`${cell.x};${cell.y}`] = {direction: this.direction};
        this.store.dispatch(ScriptStoreActions.addMapToBankPath({newMap}));
        break;
      default:
        alert('Sélectionnez une action');
        break;
    }
  }


}
