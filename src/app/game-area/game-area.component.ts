import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { Coordinate } from '../snake-position-service';

export enum KEY_CODE {
  LEFT_ARROW = 37,
  TOP_ARROW = 38,
  RIGHT_ARROW = 39,
  BOTTOM_ARROW = 40,
  ESCAPE = 27,
  SPACE = 32
}

export enum DIRECTION {
  LEFT = 0,
  TOP = 1,
  RIGHT = 2,
  BOTTOM = 3
}

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {

  public size = new Array<number>(30);
  public direction: DIRECTION = DIRECTION.RIGHT;
  public incrementPosition;
  public y = 0;
  public snakeCoordinates: Coordinate[];
  public snakeHead: Coordinate = null;
  public foodCoordinates: Coordinate = new Coordinate();

  constructor() {
  }

  ngOnDestroy() {
    this.size = [];
    this.snakeCoordinates = [];
    this.foodCoordinates = null;
    this.snakeHead = null;
  }

  ngOnInit(): void {
    this.setCoordinates();
  }

  setCoordinates() {
    this.snakeCoordinates = [{ x: 0, y: 0 }];
    this.setNewFoodCoordinates();
  }

  setNewFoodCoordinates() {
    this.foodCoordinates.x = Math.round(Math.random() * (31));
    this.foodCoordinates.y = Math.round(Math.random() * (31));
    if (this.foodCoordinates.x >= this.size.length) {
      this.foodCoordinates.x = 0;
    }
    if (this.foodCoordinates.y >= this.size.length) {
      this.foodCoordinates.y = 0;
    }
  }

  /**
  * Replace the head of the snake
  */
  manageBorder() {
    if ((this.snakeCoordinates[0].x === -1) && (this.direction === DIRECTION.LEFT))
      this.snakeCoordinates[0].x = this.size.length - 1;
    if ((this.snakeCoordinates[0].x === this.size.length) && (this.direction === DIRECTION.RIGHT))
      this.snakeCoordinates[0].x = 0;
    if ((this.snakeCoordinates[0].y === -1) && (this.direction === DIRECTION.TOP))
      this.snakeCoordinates[0].y = this.size.length - 1;
    if ((this.snakeCoordinates[0].y === this.size.length) && (this.direction === DIRECTION.BOTTOM))
      this.snakeCoordinates[0].y = 0;
  }

  /**
   * Is snake eating food ?
   * If yes, a new location is created for the food and the snake is drowing up
   */
  isSnakeEatingFood(): boolean {
    if ((this.snakeCoordinates[0].x === this.foodCoordinates.x) && (this.snakeCoordinates[0].y === this.foodCoordinates.y)) {
      return true;
    }
    return false;
  }

  getLastCoordinates(): Coordinate {
    let snakeLength = this.snakeCoordinates.length;
    let lastSnakeItem = this.snakeCoordinates[snakeLength - 1];
    return lastSnakeItem;
  }

  increaseSnakeSize() {
    let lastSnakeItemCoordinates = this.getLastCoordinates();
    let newBodyCoordinates;
    if (this.direction === DIRECTION.RIGHT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x - 1, y: lastSnakeItemCoordinates.y };
    }
    if (this.direction === DIRECTION.LEFT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x + 1, y: lastSnakeItemCoordinates.y };      
    }
    if (this.direction === DIRECTION.TOP) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y + 1 };      
    }
    if (this.direction === DIRECTION.BOTTOM) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y - 1 };      
    }
    this.snakeCoordinates.push(newBodyCoordinates);
  }

  changeDirection(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.direction = DIRECTION.RIGHT;
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.direction = DIRECTION.LEFT;
    }
    if (event.keyCode === KEY_CODE.TOP_ARROW) {
      this.direction = DIRECTION.TOP;
    }
    if (event.keyCode === KEY_CODE.BOTTOM_ARROW) {
      this.direction = DIRECTION.BOTTOM;
    }
  }

  /**
 * Get the key up event
 * @param event 
 */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.changeDirection(event);
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.stopGame();
    }
    if ((event.keyCode === KEY_CODE.SPACE) && (this.snakeCoordinates.length === 1)) {
      this.beginGame();
    }
  }

  /**
   * Stop the game
   */
  stopGame() {
    this.incrementPosition.unsubscribe();
  }

  moveSnakeBody() {
    let keepInMemory: Coordinate = this.snakeCoordinates[0];
    let keepInMemory2: Coordinate;
    let self = this;
    this.snakeCoordinates.forEach(function (part, index) {
      keepInMemory2 = this[index];
      if (index === 1) {
        this[index] = self.snakeHead;
      }
      if (index > 1) {
        this[index] = keepInMemory;
      }
      keepInMemory = keepInMemory2;
    }, this.snakeCoordinates);
    keepInMemory = null;
    keepInMemory2 = null;
  }

  moveSnakeHead() {
    if (this.direction === DIRECTION.LEFT)
      this.snakeCoordinates[0].x--;
    if (this.direction === DIRECTION.RIGHT)
      this.snakeCoordinates[0].x++;
    if (this.direction === DIRECTION.BOTTOM)
      this.snakeCoordinates[0].y++;
    if (this.direction === DIRECTION.TOP)
      this.snakeCoordinates[0].y--;
  }

  /**
  * Begin the game and automatically move the snake
  */
  beginGame() {
    this.incrementPosition = interval(150).subscribe(n => {
      this.snakeHead = Object.assign({}, this.snakeCoordinates[0]);
      this.moveSnakeBody();
      this.moveSnakeHead();
      this.manageBorder();
      if (this.isSnakeEatingFood()) {
        this.increaseSnakeSize();
        this.setNewFoodCoordinates();
      }
    });
  }

  trackByFn(index, item) {
    this.y = index;
  }
}