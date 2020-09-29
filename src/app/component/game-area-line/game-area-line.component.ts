import { Component, OnInit, Input } from '@angular/core';
import { CELL } from '../../object/Coordinate';
import { DIRECTION } from '../../object/Direction';

@Component({
  selector: 'app-game-area-line',
  templateUrl: './game-area-line.component.html',
  styleUrls: ['./game-area-line.component.css']
})
export class GameAreaLineComponent implements OnInit {

  @Input("size_width") size_width: number;

  public Direction = DIRECTION;
  
  public _y: number;
  @Input("y")
  get y(): number {
    return this._y;
  }
  set y(tmpY: number) {
    this._y = tmpY;
  }

  public _direction: DIRECTION;
  @Input("direction")
  get direction(): DIRECTION {
    return this._direction;
  }
  set direction(tmpDirection: DIRECTION) {
    this._direction = tmpDirection;
  }

  private _snakePos: CELL[];
  @Input("snakeCoordinates")
  get snakePos(): CELL[] {
    return this._snakePos;
  }
  set snakePos(tmpSnakePos) {
    this._snakePos = tmpSnakePos;
  }

  private _foodCoordinates: CELL;
  @Input("foodCoordinates")
  get foodCoordinates(): CELL {
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
    this._snakePos.forEach((snakePos : CELL, index : number) => {
      if ((index > 0) && ((snakePos.x === x) && (snakePos.y === this._y)))
        display = true;
    });
    return display;
  }

  displayEmptyBox(x: number): boolean {
    if (!this.displayFood(x) && !this.displaySnakeHead(x) && !this.displaySnakeBody(x))
      return true;
    return false;
  }

/*   displayHorizontal(x : number)
  {
    let cell : CELL  = this._snakePos.find(tmpCell => ((tmpCell.x === x) && (tmpCell.y === this._y)));
//    console.log(cell);
    return (cell.horizontal);
  } */
}
