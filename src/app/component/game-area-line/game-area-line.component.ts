import { Component, OnInit, Input } from '@angular/core';
import { CELL } from '../../object/Cell';
import { DIRECTION } from '../../object/Direction';

@Component({
  selector: 'app-game-area-line',
  templateUrl: './game-area-line.component.html',
  styleUrls: ['./game-area-line.component.css']
})
export class GameAreaLineComponent implements OnInit {

  @Input('sizeWidth') sizeWidth: number;

  public Direction = DIRECTION;

  private _y: number;
  @Input('y')
  get y(): number {
    return this._y;
  }
  set y(tmpY: number) {
    this._y = tmpY;
  }

  public _direction: DIRECTION;
  @Input('direction')
  get direction(): DIRECTION {
    return this._direction;
  }
  set direction(tmpDirection: DIRECTION) {
    this._direction = tmpDirection;
  }

  private _snakePos: CELL[];
  @Input('snakeCoordinates')
  get snakePos(): CELL[] {
    return this._snakePos;
  }
  set snakePos(tmpSnakePos) {
    this._snakePos = tmpSnakePos;
  }

  private _foodCoordinates: CELL;
  @Input('foodCoordinates')
  get foodCoordinates(): CELL {
    return this._foodCoordinates;
  }
  set foodCoordinates(tmpFoodPos) {
    this._foodCoordinates = tmpFoodPos;
  }

  private _wallCoordinates: CELL[];
  @Input('wallCoordinates')
  get wallCoordinates(): CELL[] {
    return this._wallCoordinates;
  }
  set wallCoordinates(tmpWallPos) {
    this._wallCoordinates = tmpWallPos;
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayFood(x: number) {
    if ((this._foodCoordinates.x === x) && (this._foodCoordinates.y === this._y)) {
      return true;
    }
    return false;
  }

  displayWall(x: number) {
    let display = false;
    if (this._wallCoordinates) {
      this._wallCoordinates.forEach(function(wallPos: CELL, index: number){
        if ((wallPos.x === x) && (wallPos.y === this._y)) {
          display = true;
        }
      }, this);
    }
    return display;
  }

  displaySnakeHead(x: number) {
    if ((this._snakePos[0].x === x) && (this._snakePos[0].y === this._y)) {
      return true;
    }
    return false;
  }

  displaySnakeBody(x: number) {
    let display = false;
    this._snakePos.forEach(function(snakePos: CELL, index: number){
      if ((index > 0) && ((snakePos.x === x) && (snakePos.y === this._y))) {
        display = true;
      }
    }, this);
    return display;
  }

  displayEmptyBox(x: number) {
    if (!this.displayFood(x) && !this.displaySnakeHead(x) && !this.displaySnakeBody(x)) {
      return true;
    }
    return false;
  }
}
