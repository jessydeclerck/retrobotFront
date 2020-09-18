import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { mapfiles } from '../../../shared/constants/mapfiles'

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit, AfterViewInit {

  ctx: CanvasRenderingContext2D;
  images: any[] = [];
  @ViewChild('mapCanvas') mapRef: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {

  }

  paint(): void {

    mapfiles.forEach( (map, index) => {
      const coords = map.split('.png')[0].split('-');
      const newMap = new Image();
      newMap.onload = () => {
        this.ctx.fillRect(0, 0, 15, 10);
        const x = newMap.width * parseInt(coords[0]);
        const y = newMap.height * parseInt(coords[1]);
        console.log(x, y);
        this.ctx.drawImage(newMap, x, y);
        console.log(newMap)
      }
      newMap.src = '/assets/img/map/' + map;
      this.images.push(newMap);
    });
  }

  ngAfterViewInit(): void {
    this.ctx  = this.mapRef.nativeElement.getContext('2d');
    this.paint();
  }

}
