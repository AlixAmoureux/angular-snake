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
  public foodCoordinates: Coordinate = new Coordinate();

  constructor() {
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
    if (this.foodCoordinates.x > this.size.length) {
      this.foodCoordinates.x = 0;
    }
    if (this.foodCoordinates.y > this.size.length) {
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
  isSnakeEatingFood() {
    if ((this.snakeCoordinates[0].x === this.foodCoordinates.x) && this.snakeCoordinates[0].y === this.foodCoordinates.y) {
      this.setNewFoodCoordinates();
    }
  }

  /**
 * Get the key up event
 * @param event 
 */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.snakeCoordinates[0].x++;
      this.direction = DIRECTION.RIGHT;
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.snakeCoordinates[0].x--;
      this.direction = DIRECTION.LEFT;
    }
    if (event.keyCode === KEY_CODE.TOP_ARROW) {
      this.snakeCoordinates[0].y--;
      this.direction = DIRECTION.TOP;
    }
    if (event.keyCode === KEY_CODE.BOTTOM_ARROW) {
      this.snakeCoordinates[0].y++;
      this.direction = DIRECTION.BOTTOM;
    }
    this.manageBorder();
    this.isSnakeEatingFood();
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.stopGame();
    }
    if (event.keyCode === KEY_CODE.SPACE) {
      this.beginGame();
    }
  }

  /**
   * Stop the game
   */
  stopGame() {
    this.incrementPosition.unsubscribe();
  }

  /**
  * Begin the game and automatically move the snake
  */
  beginGame() {
    this.incrementPosition = interval(150).subscribe(n => {
      let x: number = this.snakeCoordinates[0].x;
      let y: number = this.snakeCoordinates[0].y;
      if (this.direction === DIRECTION.LEFT)
        this.snakeCoordinates[0].x--;
      if (this.direction === DIRECTION.RIGHT)
        this.snakeCoordinates[0].x++;
      if (this.direction === DIRECTION.BOTTOM)
        this.snakeCoordinates[0].y++;
      if (this.direction === DIRECTION.TOP)
        this.snakeCoordinates[0].y--;
      this.manageBorder();
      this.isSnakeEatingFood(); 
    });
  }

  trackByFn(index, item) {
    this.y = index;
  }
}