import { Injectable } from '@angular/core';
import { CELL } from '../object/Cell';
import { DIRECTION } from '../object/Direction';

@Injectable({
  providedIn: 'root'
})
export class ErrorManagementService {

  constructor() { }

  wallAlreadyExist(wallCoordinates: CELL[], wallX: number, wallY: number) {
    let alreadyExist = false;
    if (wallCoordinates) {
      wallCoordinates.find((value: CELL, index: number) => {
        if ((value.x === wallX) && (value.y === wallY)) {
          alreadyExist = true;
        }
      });
    }
    return alreadyExist;
  }

  isSnakeEatingItself(snakeCoordinates: CELL[], snakeHead: CELL) {
    let isEatingItself = false;
    snakeCoordinates.forEach((item, index) => {
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
  manageBorderError(sizeWidth, sizeHeight, snakeCoordinates: CELL[], direction: DIRECTION, isAllowed: boolean) {
    if ((snakeCoordinates[0].x === -1) && (direction === DIRECTION.LEFT)) {
      snakeCoordinates[0].x = sizeWidth.length - 1;
      if (!isAllowed) {
        return false;
      }
    }
    if ((snakeCoordinates[0].x === sizeWidth.length) && (direction === DIRECTION.RIGHT)) {
      snakeCoordinates[0].x = 0;
      if (!isAllowed) {
        return false;
      }
    }
    if ((snakeCoordinates[0].y === -1) && (direction === DIRECTION.TOP)) {
      snakeCoordinates[0].y = sizeHeight.length - 1;
      if (!isAllowed) {
        return false;
      }
    }
    if ((snakeCoordinates[0].y === sizeHeight.length) && (direction === DIRECTION.BOTTOM)) {
      snakeCoordinates[0].y = 0;
      if (!isAllowed) {
        return false;
      }
    }
    return true;
  }

  isSnakeCrossingAWall(snakeHead: CELL, walls: CELL[]) {
    let wallError = false;
    walls.forEach((wall: CELL, index: number) => {
      if ((wall.x === snakeHead.x) && (wall.y === snakeHead.y)) {
        wallError = true;
      }
    });
    return wallError;
  }
}
