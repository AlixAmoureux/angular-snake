import { Injectable } from '@angular/core';
import { CELL } from '../object/Cell';
import { DIRECTION } from '../object/Direction';

@Injectable({
  providedIn: 'root'
})
export class MoveSnakeService {

  constructor() { }

    /**
   * Snake body item takes the position of the item in front of it
   */
  moveSnakeBody(snakeHead: CELL, snakeCoordinates : CELL[]) {
    let keepInMemory: CELL;
    let keepInMemory2: CELL;
    snakeCoordinates.forEach(function (item, index) {
      keepInMemory2 = item;
      if (index === 1) {
        this[index] = snakeHead;
      }
      if (index > 1) {
        this[index] = keepInMemory;
      }
      keepInMemory = keepInMemory2;
    }, snakeCoordinates);
    keepInMemory = null;
    keepInMemory2 = null;
  }

  /**
   * The snake head changes its position according to the arrow key entered
   */
  moveSnakeHead(direction : DIRECTION, snakeCoordinates : CELL[]) {
    if (direction === DIRECTION.LEFT)
      snakeCoordinates[0].x--;
    if (direction === DIRECTION.RIGHT)
      snakeCoordinates[0].x++;
    if (direction === DIRECTION.BOTTOM)
      snakeCoordinates[0].y++;
    if (direction === DIRECTION.TOP)
      snakeCoordinates[0].y--;
  }
}
