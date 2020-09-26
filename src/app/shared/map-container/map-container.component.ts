import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { mapfiles } from '../constants/mapfiles'
import {DragScrollComponent} from "ngx-drag-scroll";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../root-store";
import {combineLatest, Observable} from "rxjs";
import {CellCoordinates} from "../models/cell-coordinates";
import {BotStoreSelectors} from "../../root-store/bot-store";
import {map, take} from "rxjs/operators";
import {coordinates} from "../../root-store/bot-store/selectors";
import {ScriptStoreSelectors} from "../../root-store/script-store";

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements AfterViewInit, OnDestroy {

  @Input()
  displayPosition: boolean;

  @Output()
  clickOnCell: EventEmitter<CellCoordinates> = new EventEmitter<CellCoordinates>();
  private sub$;

  private ctx: CanvasRenderingContext2D;
  private images: any[] = [];

  public cellPosition: string = '';

  @ViewChild('mapContainer', {read: DragScrollComponent}) ds: DragScrollComponent;

  public mapConfig = {
    height: 13,
    width:10,
    mapShardHeight: 345,
    mapShardWidth: 600,
    cellsByRowOrCol: 15,
    scale: 1
  }

  public cellConfig;
  @ViewChild('mapCanvas') mapRef: ElementRef<HTMLCanvasElement>;

  constructor(private readonly store: Store<RootStoreState.State>) { }

  /**
   * Lancé après l'initialisation de la vue pour que le canvas soit affiché et que
   * this.mapRef ne soit pas undefined
   */
  ngAfterViewInit(): void {
    this.ctx  = this.mapRef.nativeElement.getContext('2d');
    this.drawMap();
    setTimeout(() => {
      this.scroll(-2,0);
      this.handleObservables();
      }, 200);

  }


  /**
   * Va aller charger les images de la carte une fois
   */
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
        /**
         * On fait variabilise la partie d'afficahge des images pour pouvoir les redessiner sans avoir à les recharger
         * @see redrawMap
         */
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

  /**
   * va chercher les fonctions d'affichage de toutes les parties de map pour les réafficher
   */
  private redrawMap(): void {
    this.images.forEach(drawFunction => {
      drawFunction();
    })
  }

  /**
   * Affiche les cellules pour une partie de la carte donnée.
   * Appellée à la fin de l'affichage des parties de carte pour dessiner la grille correspondante à cette partie de carte
   */
  private drawCells(x, y): void {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#000000';
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


  /**
   * renvoie les coordonnées de la cellule sur laquelle l'utilisateur a cliqué
   * On utilise 'LayerX' de l'évènement de clic qui permet de trouver la position sur la carte malgré le scroll
   */
  public click(event): void {
    const x = -90 + Math.floor(event.layerX / this.cellConfig.cellWidth);
    const y = -120 + Math.floor(event.layerY / this.cellConfig.cellHeight);
    this.clickOnCell.emit({x, y});

  }

  /**
   * renvoie les coordonnées de la cellule sur laquelle l'utilisateur a cliqué
   * On utilise 'LayerX' de l'évènement de clic qui permet de trouver la position sur la carte malgré le scroll
   */
  public logcoordinates(event): void {
    const x = -90 + Math.floor(event.layerX / this.cellConfig.cellWidth);
    const y = -120 + Math.floor(event.layerY / this.cellConfig.cellHeight);

    const mapPosition = document.getElementById('position-tooltip');
    mapPosition.style.top = (event.y + 20) + 'px';
    mapPosition.style.left = (event.x + 20) + 'px';
    this.cellPosition = `${x};${y}`;
  }

  /**
   * Se déplace jusqu'à centrer la carte sur la cellule aux coordonnées en paramètres
   */
  private scroll(x, y): void{
    const mapContainer = document.getElementsByClassName('drag-scroll-content')[0];
    mapContainer.scrollTo((x + 90) * this.cellConfig.cellWidth - mapContainer.clientWidth / 2 ,
      (y + 120) * this.cellConfig.cellHeight - mapContainer.clientHeight /2 );
  }

  private handleObservables(): void {
    this.sub$ = combineLatest([
      this.store.select(ScriptStoreSelectors.selectBankMap),
      this.store.select(ScriptStoreSelectors.selectStartMap),
      this.store.select(ScriptStoreSelectors.selectGatherPath),
      this.store.select(ScriptStoreSelectors.selectBankPath),
      this.store.select(BotStoreSelectors.coordinates),
    ]).subscribe(([bankMap, startMap, gatherPath, bankPath, coordinates]) => {
      this.redrawMap();
      if (this.displayPosition && coordinates){
        this.drawCircleInCell(coordinates.x, coordinates.y, '#CD5C5C');
        this.scroll(coordinates.x, coordinates.y);
      }
      if(bankMap) {
        this.drawCircleInCell(bankMap.x, bankMap.y, '#e7b533')
      }
      if(startMap) {
        this.drawCircleInCell(startMap.x, startMap.y, '#01ff22')
      }
      Object.keys(gatherPath).forEach((map) => {
        if (gatherPath[map]) {
          this.drawGatherPathArrow(map, gatherPath[map].direction, gatherPath[map].gather ? '#0f8603' : '#0040ff');
        }
      });
      Object.keys(bankPath).forEach((map) => {
        if(bankPath[map]) {
          this.drawGatherPathArrow(map, bankPath[map].direction, '#664a03', true);
        }
      });
    });
  }


  private drawGatherPathArrow(map, direction, hexColor, isBank = false): void {
    this.ctx.lineWidth = 3;
    const x = parseInt(map.split(',')[0]);
    const y = parseInt(map.split(',')[1]);
    this.ctx.beginPath();
    const offsetCoef = isBank ? 3 : 1;
    switch (direction){
      case 'right':
        this.drawArrow(
          (x + 90) * this.cellConfig.cellWidth,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight * offsetCoef / 4,
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight * offsetCoef / 4,
          hexColor);
        break;
      case 'left':
        this.drawArrow(
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight * offsetCoef / 4,
          (x + 90) * this.cellConfig.cellWidth,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight * offsetCoef/ 4,
          hexColor);
        break;
      case 'top':
        this.drawArrow(
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth * offsetCoef / 4,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight,
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth * offsetCoef / 4,
          (y + 120) * this.cellConfig.cellHeight,
          hexColor);
        break;
      case 'bottom':
        this.drawArrow(
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth * offsetCoef / 4,
          (y + 120) * this.cellConfig.cellHeight,
          (x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth * offsetCoef / 4,
          (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight,
          hexColor);
        break;
    }
    this.ctx.stroke();

  }




  /**
   * Dessine un cercle
   */
  private drawCircleInCell(x, y, hexColor): void{
    this.ctx.fillStyle = hexColor;
    this.ctx.beginPath();
    this.ctx.arc((x + 90) * this.cellConfig.cellWidth + this.cellConfig.cellWidth / 2,
      (y + 120) * this.cellConfig.cellHeight + this.cellConfig.cellHeight / 2, 10, 0,  2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }


  private drawArrow(fromx, fromy, tox, toy, hexColor) {
    this.ctx.strokeStyle = hexColor;
    const headlen = 10; // length of head in pixels
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    this.ctx.moveTo(fromx, fromy);
    this.ctx.lineTo(tox, toy);
    this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    this.ctx.moveTo(tox, toy);
    this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }



}
