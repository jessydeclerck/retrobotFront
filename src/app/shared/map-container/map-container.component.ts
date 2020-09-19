import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { mapfiles } from '../constants/mapfiles'

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements AfterViewInit {

  ctx: CanvasRenderingContext2D;
  images: any[] = [];

  public mapConfig = {
    height: 13,
    width:10,
    mapShardHeight: 345,
    mapShardWidth: 600,
    cellsByRowOrCol: 15, //Because ce n'est pas un carré mais les cellules non plus are not des carrés
    scale: 1
  }

  public cellConfig = {
    cellHeight: this.mapConfig.mapShardHeight / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale,
    cellWidth: this.mapConfig.mapShardWidth / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale,
  }
  @ViewChild('mapCanvas') mapRef: ElementRef<HTMLCanvasElement>;

  constructor() { }


  private drawMapAndGrid(): void {
    this.drawMap();
  }

  private drawMap(): void {
    mapfiles.forEach( (map, index) => {
      const coords = map.split('.png')[0].split('-');
      const newMap = new Image();
      newMap.onload = () => {
        const x = newMap.width * parseInt(coords[0]) * this.mapConfig.scale;
        const y = newMap.height * parseInt(coords[1]) * this.mapConfig.scale;
        this.ctx.drawImage(newMap, x, y, newMap.width* this.mapConfig.scale, newMap.height * this.mapConfig.scale);
        this.drawCells(x, y)
      }
      newMap.src = '/assets/img/map/' + map;
      this.images.push(newMap);
    });
  }

  private drawCells(x, y): void {
    for (let i = 0 ; i < this.mapConfig.cellsByRowOrCol ; i++){
      for (let j = 0 ; j < this.mapConfig.cellsByRowOrCol ; j ++) {
        this.ctx.strokeRect(x + i * this.cellConfig.cellWidth, y + j * this.cellConfig.cellHeight, this.cellConfig.cellWidth, this.cellConfig.cellHeight)
      }
    }
  }
  public clic(event): void {
    const x = -90 + Math.floor(event.layerX / this.cellConfig.cellWidth);
    const y = -120 + Math.floor(event.layerY / this.cellConfig.cellHeight);
    alert(x + ' ; ' + y);

  }

  public zoom(event): void {
    this.mapConfig.scale += event.deltaY * 0.002;
    this.cellConfig = {
      cellHeight: this.mapConfig.mapShardHeight / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale,
      cellWidth: this.mapConfig.mapShardWidth / this.mapConfig.cellsByRowOrCol * this.mapConfig.scale,
    }
    this.drawMap();
  }

  ngAfterViewInit(): void {
    this.ctx  = this.mapRef.nativeElement.getContext('2d');
    this.drawMapAndGrid();
  }

}
