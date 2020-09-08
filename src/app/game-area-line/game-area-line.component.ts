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

  private _snakePos: Coordinate[];
  @Input("snakeCoordinates")
  get snakePos(): Coordinate[] {
    return this._snakePos;
  }
  set snakePos(tmpSnakePos) {
    this._snakePos = tmpSnakePos;
  }

  private _foodCoordinates: Coordinate;
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

  displayFood(x: number): boolean {
    if ((this._foodCoordinates.x === x) && (this._foodCoordinates.y === this._y))
      return true;
    return false;
  }

  displaySnakeHead(x: number): boolean {
    if ((this._snakePos[0].x === x) && (this._snakePos[0].y === this._y))
      return true;
    return false;
  }

  displaySnakeBody(x: number): boolean {
    let display: boolean = false;
    this._snakePos.forEach(snakePos => {
      if ((snakePos.x === x) && (snakePos.y === this._y))
        display = true;
    });
    return display;
  }

  displayEmptyBox(x: number): boolean {
    if (!this.displayFood(x) && !this.displaySnakeHead(x) && !this.displaySnakeBody(x))
      return true;
    return false;
  }
}
