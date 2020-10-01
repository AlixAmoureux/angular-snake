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

  constructor(public getMainInfoService : GetMainInfoService, public errorManagementService : ErrorManagementService ) { }

  setNewFoodCoordinates(foodCoordinates : CELL, level : LEVEL, size_width, size_height) {
    foodCoordinates.x = Math.round(Math.random() * (this.getMainInfoService.getSize(level)[0] + 1));
    foodCoordinates.y = Math.round(Math.random() * (this.getMainInfoService.getSize(level)[1] + 1));
    if (foodCoordinates.x >= size_width.length) {
      foodCoordinates.x = 0;
    }
    if (foodCoordinates.y >= size_height.length) {
      foodCoordinates.y = 0;
    }
  }

  setNewWallCoordinates(foodCoordinates : CELL, wallCoordinates : CELL[], level : LEVEL) {
    let wallNumber: number = 0;
    let wallNumberToReach: number = this.getMainInfoService.getWallNumber(level);
    while (wallNumber != wallNumberToReach) {
      let wallX: number = Math.round(Math.random() * (this.getMainInfoService.getSize(level)[0] - 1));
      let wallY: number = Math.round(Math.random() * (this.getMainInfoService.getSize(level)[1] - 1));
      if (!(((wallX === foodCoordinates.x) && (wallY === foodCoordinates.y)) || this.errorManagementService.wallAlreadyExist(wallCoordinates, wallX, wallY))) {
        if (wallCoordinates === null || wallCoordinates === undefined)
          wallCoordinates = [{ x: wallX, y: wallY }];
        else
          wallCoordinates.push({ x: wallX, y: wallY });
        wallNumber++;
      }
    }
  }

  getLastCoordinates(snakeCoordinates : CELL[]): CELL {
    let snakeLength = snakeCoordinates.length;
    let lastSnakeItem = snakeCoordinates[snakeLength - 1];
    return lastSnakeItem;
  }

  increaseSnakeSize(direction : DIRECTION, snakeCoordinates : CELL[]) {
    let lastSnakeItemCoordinates = this.getLastCoordinates(snakeCoordinates);
    let newBodyCoordinates;
    if (direction === DIRECTION.RIGHT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x - 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (direction === DIRECTION.LEFT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x + 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (direction === DIRECTION.TOP) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y + 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (direction === DIRECTION.BOTTOM) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y - 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    snakeCoordinates.push(newBodyCoordinates);
  }
}
