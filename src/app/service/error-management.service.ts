import { Injectable } from '@angular/core';
import { CELL } from '../object/Cell';
import { DIRECTION } from '../object/Direction';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagementService {

  constructor() { }

  wallAlreadyExist(wallCoordinates: CELL[], wallX: number, wallY: number): boolean {
    let alreadyExist: boolean = false;
    if (wallCoordinates) {
      wallCoordinates.find(function (value: CELL, index: number) {
        if ((value.x === wallX) && (value.y === wallY))
          alreadyExist = true;
      });
    }
    return alreadyExist;
  }

  isSnakeEatingItself(snakeCoordinates: CELL[], snakeHead: CELL): boolean {
    let isEatingItself: boolean = false;
    snakeCoordinates.forEach(function (item, index) {
      if (index > 1) {
        if ((item.x === snakeHead.x) && (item.y === snakeHead.y)) {
          isEatingItself = true;
        }
      }
    }, snakeCoordinates);
    return isEatingItself;
  }

  /**
* Replace the head of the snake
*/
  manageBorderError(size_width, size_height, snakeCoordinates: CELL[], direction: DIRECTION, isAllowed: boolean) {
    if ((snakeCoordinates[0].x === -1) && (direction === DIRECTION.LEFT)) {
      snakeCoordinates[0].x = size_width.length - 1;
      if (!isAllowed)
        return false;
    }
    if ((snakeCoordinates[0].x === size_width.length) && (direction === DIRECTION.RIGHT)) {
      snakeCoordinates[0].x = 0;
      if (!isAllowed)
        return false;
    }
    if ((snakeCoordinates[0].y === -1) && (direction === DIRECTION.TOP)) {
      snakeCoordinates[0].y = size_height.length - 1;
      if (!isAllowed)
        return false;
    }
    if ((snakeCoordinates[0].y === size_height.length) && (direction === DIRECTION.BOTTOM)) {
      snakeCoordinates[0].y = 0;
      if (!isAllowed)
        return false;
    }
    return true;
  }

  isSnakeCrossingAWall(snakeHead : CELL, walls : CELL[]): boolean {
    let wallError : boolean = false;
    walls.forEach(function(wall : CELL, index : number)
    {
      if ((wall.x === snakeHead.x) && (wall.y === snakeHead.y))
      wallError = true;
    });
    return wallError;
  }
}
