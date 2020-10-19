import { Injectable } from '@angular/core';
import { CELL } from '../object/Cell';
import { LEVEL } from '../object/Level';
import { DIRECTION } from '../object/Direction';
import { GetMainInfoService } from '../service/get-main-info.service';
import { ErrorManagementService } from '../service/error-management.service';

@Injectable({
  providedIn: 'root'
})
export class AddNewItemService {

  constructor(public getMainInfoService: GetMainInfoService, public errorManagementService: ErrorManagementService) { }

  setNewFoodCoordinates(foodCoordinates: CELL, level: LEVEL, sizeWidth, sizeHeight) {
    foodCoordinates.x = Math.round(Math.random() * (sizeWidth - 1));
    foodCoordinates.y = Math.round(Math.random() * (sizeHeight - 1));
  }

  setNewWallCoordinates(foodCoordinates: CELL, wallCoordinates: CELL[], level: LEVEL, sizeWidth, sizeHeight) {
    let wallNumber = 0;
    const wallNumberToReach = this.getMainInfoService.getWallNumber(level);
    while (wallNumber !== wallNumberToReach) {
      const wallX = Math.round(Math.random() * (sizeWidth - 1));
      const wallY = Math.round(Math.random() * (sizeHeight - 1));
      if (!(((wallX === foodCoordinates.x) && (wallY === foodCoordinates.y)) ||
        this.errorManagementService.wallAlreadyExist(wallCoordinates, wallX, wallY))) {
        if (wallCoordinates === null || wallCoordinates === undefined) {
          wallCoordinates = [{ x: wallX, y: wallY }];
        }
        else {
          wallCoordinates.push({ x: wallX, y: wallY });
        }
        wallNumber++;
      }
    }
  }

  getLastCoordinates(snakeCoordinates: CELL[]): CELL {
    const snakeLength = snakeCoordinates.length;
    const lastSnakeItem = snakeCoordinates[snakeLength - 1];
    return lastSnakeItem;
  }

  increaseSnakeSize(direction: DIRECTION, snakeCoordinates: CELL[]) {
    const lastSnakeItemCoordinates = this.getLastCoordinates(snakeCoordinates);
    let newBodyCoordinates: CELL;
    if (direction === DIRECTION.RIGHT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x - 1, y: lastSnakeItemCoordinates.y};
    }
    if (direction === DIRECTION.LEFT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x + 1, y: lastSnakeItemCoordinates.y};
    }
    if (direction === DIRECTION.TOP) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y + 1};
    }
    if (direction === DIRECTION.BOTTOM) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y - 1};
    }
    snakeCoordinates.push(newBodyCoordinates);
  }
}
