import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { mapfiles } from '../constants/mapfiles'
import {DragScrollComponent} from "ngx-drag-scroll";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {Observable} from "rxjs";
import {CellCoordinates} from "../models/cell-coordinates";
import {BotStoreSelectors} from "../../root-store/bot-store";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements AfterViewInit {

  private ctx: CanvasRenderingContext2D;
  private images: any[] = [];

  coordinates$: Observable<CellCoordinates> = this.store.select(BotStoreSelectors.coordinates);

  @ViewChild('mapContainer', {read: DragScrollComponent}) ds: DragScrollComponent;

  public mapConfig = {
    height: 13,
    width:10,
    mapShardHeight: 345,
    mapShardWidth: 600,
    cellsByRowOrCol: 15, //Because ce n'est pas un carré mais les cellules non plus are not des carrés
    scale: 1
  }

  public cellConfig;
  @ViewChild('mapCanvas') mapRef: ElementRef<HTMLCanvasElement>;

  constructor(private readonly store: Store<RootStoreState.State>) { }

  ngAfterViewInit(): void {
    this.ctx  = this.mapRef.nativeElement.getContext('2d');
    this.drawMap();
    this.coordinates$.subscribe((coordinates) => {
      this.redrawMap();
      this.drawPosition(coordinates.x, coordinates.y);
      this.scroll(coordinates.x, coordinates.y);
    });
  }


  private drawMap(): void {
    this.cellConfig = {
      cellHeight: Math.round(this.mapConfig.mapShardHeight / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale),
      cellWidth: Math.round(this.mapConfig.mapShardWidth / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale),
    }
    mapfiles.forEach( (map, index) => {
      const coords = map.split('.png')[0].split('-');
      const newMap = new Image();
      newMap.onload = () => {
        const x = newMap.width * parseInt(coords[0]) * this.mapConfig.scale;
        const y = newMap.height * parseInt(coords[1]) * this.mapConfig.scale;
        const draw = () => {
          this.ctx.drawImage(newMap, x, y, newMap.width* this.mapConfig.scale, newMap.height * this.mapConfig.scale);
          this.drawCells(x, y);
        }
        draw();
        this.images.push(draw);
      };
      newMap.src = './assets/img/map/' + map;
    });
  }

  private redrawMap(): void {
    this.images.forEach(drawFunction => {
      drawFunction();
    })
  }

  private drawCells(x, y): void {
    for (let i = 0 ; i < this.mapConfig.cellsByRowOrCol ; i++){
      for (let j = 0 ; j < this.mapConfig.cellsByRowOrCol ; j ++) {
        this.ctx.strokeRect(x + i * this.cellConfig.cellWidth, y + j * this.cellConfig.cellHeight, this.cellConfig.cellWidth, this.cellConfig.cellHeight)
      }
    }
  }

  public zoom(event): void {
    /*this.mapConfig.scale += event.deltaY * 0.002;
    this.drawMap();*/
  }

  private drawPosition(x, y){
    this.ctx.fillStyle= '#CD5C5C';
    this.ctx.beginPath();
    this.ctx.arc((x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth / 2,
      y + (y + 120 + 1) * this.cellConfig.cellHeight + this.cellConfig.cellHeight / 2, 10, 0,  2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }


  public click(event): void {
    const x = -90 + Math.floor(event.layerX / this.cellConfig.cellWidth);
    const y = -120 + Math.floor(event.layerY / this.cellConfig.cellHeight);
    alert(x + ' ; ' + y);

  }

  private scroll(x, y){
    const mapContainer = document.getElementsByClassName('drag-scroll-content')[0];
    mapContainer.scrollTo((x + 90) * this.cellConfig.cellWidth - mapContainer.clientWidth / 2 ,
      (y + 120) * this.cellConfig.cellHeight - mapContainer.clientHeight /2 );
  }

}
