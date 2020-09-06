import { Component, OnInit, Input } from '@angular/core';
import { Coordinate } from '../snake-position-service';

@Component({
  selector: 'app-game-area-line',
  templateUrl: './game-area-line.component.html',
  styleUrls: ['./game-area-line.component.css']
})
export class GameAreaLineComponent implements OnInit {

  @Input("size") size: number;

  public _y: number;
  @Input("y")
  get y(): number {
    return this._y;
  }
  set y(tmpY: number) {
    this._y = tmpY;
  }

  public _snakePos: Coordinate[];
  @Input("snakeCoordinates")
  get snakePos(): Coordinate[] {
    return this._snakePos;
  }
  set snakePos(tmpSnakePos) {
    this._snakePos = tmpSnakePos;
  }

  public _foodCoordinates: Coordinate;
  @Input("foodCoordinates")
  get foodCoordinates(): Coordinate {
    return this._foodCoordinates;
  }
  set foodCoordinates(tmpFoodPos) {
    this._foodCoordinates = tmpFoodPos;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
