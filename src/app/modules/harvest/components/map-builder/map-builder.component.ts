import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../../../root-store";
import {CellCoordinates} from "../../../../shared/models/cell-coordinates";
import {ScriptStoreActions} from "../../../../root-store/script-store";
import {banks} from "../../../../shared/constants/banks";

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.scss']
})
export class MapBuilderComponent {

  public drawPathMode: string;
  public direction: string = 'top';

  public banklist = banks;

  constructor(private readonly store: Store<RootStoreState.State>) {
  }

  public onClickOnCell(cell: CellCoordinates): void {
    const newMap = {}
    console.log(this.direction);
    switch (this.drawPathMode) {
      case 'startMap':
        this.store.dispatch(ScriptStoreActions.changeStartMap({newMapId: cell}));
        break;
      case 'move':
      case 'harvest':
        newMap[`${cell.x},${cell.y}`] = this.direction === 'delete' ? undefined : {direction: this.direction, gather: this.drawPathMode === 'harvest'};
        this.store.dispatch(ScriptStoreActions.addMapToPath({newMap}));
        break;
      case 'bank':
        newMap[`${cell.x},${cell.y}`] = this.direction === 'delete' ? undefined : {direction: this.direction};
        this.store.dispatch(ScriptStoreActions.addMapToBankPath({newMap}));
        break;
      default:
        alert('Sélectionnez une action');
        break;
    }
  }

  public changeBank (cell: CellCoordinates): void {
    this.store.dispatch(ScriptStoreActions.changeBankMap({newMapId: cell}));
  }

}
