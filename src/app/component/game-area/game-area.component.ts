import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { CELL } from '../../object/Coordinate';
import { KEY_CODE } from '../../object/KeyCode';
import { DIRECTION } from '../../object/Direction';
import { STATE } from '../../object/State';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit {

  public size_width = new Array<number>(50);
  public size_height = new Array<number>(30);
  public direction: DIRECTION = DIRECTION.RIGHT;
  public incrementPosition;
  public y = 0;
  public snakeCoordinates: CELL[];
  public snakeHead: CELL = null;
  public foodCoordinates: CELL = new CELL();
  public state: STATE = STATE.INACTIVE;
  public score : number = 0;

  constructor() {
  }

  ngOnDestroy() {
    this.size_width = [];
    this.size_height = [];
    this.snakeCoordinates = [];
    this.foodCoordinates = null;
    this.snakeHead = null;
  }

  ngOnInit(): void {
    this.setCoordinates();
  }

  setCoordinates() {
    this.snakeCoordinates = [{ x: 0, y: 0/* , horizontal: true */}];
    this.setNewFoodCoordinates();
    this.score = 0;
  }

  setNewFoodCoordinates() {
    this.foodCoordinates.x = Math.round(Math.random() * (31));
    this.foodCoordinates.y = Math.round(Math.random() * (31));
    if (this.foodCoordinates.x >= this.size_width.length) {
      this.foodCoordinates.x = 0;
    }
    if (this.foodCoordinates.y >= this.size_height.length) {
      this.foodCoordinates.y = 0;
    }
  }

  /**
  * Replace the head of the snake
  */
  manageBorder() {
    if ((this.snakeCoordinates[0].x === -1) && (this.direction === DIRECTION.LEFT))
      this.snakeCoordinates[0].x = this.size_width.length - 1;
    if ((this.snakeCoordinates[0].x === this.size_width.length) && (this.direction === DIRECTION.RIGHT))
      this.snakeCoordinates[0].x = 0;
    if ((this.snakeCoordinates[0].y === -1) && (this.direction === DIRECTION.TOP))
      this.snakeCoordinates[0].y = this.size_height.length - 1;
    if ((this.snakeCoordinates[0].y === this.size_height.length) && (this.direction === DIRECTION.BOTTOM))
      this.snakeCoordinates[0].y = 0;
  }

  /**
   * Is snake eating food ?
   * If yes, a new location is created for the food and the snake is drowing up
   */
  isSnakeEatingFood(): boolean {
    if ((this.snakeCoordinates[0].x === this.foodCoordinates.x) && (this.snakeCoordinates[0].y === this.foodCoordinates.y)) {
      this.score ++;
      return true;
    }
    return false;
  }

  getLastCoordinates(): CELL {
    let snakeLength = this.snakeCoordinates.length;
    let lastSnakeItem = this.snakeCoordinates[snakeLength - 1];
    return lastSnakeItem;
  }

  increaseSnakeSize() {
    let lastSnakeItemCoordinates = this.getLastCoordinates();
    let newBodyCoordinates;
    if (this.direction === DIRECTION.RIGHT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x - 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */};
    }
    if (this.direction === DIRECTION.LEFT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x + 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */};
    }
    if (this.direction === DIRECTION.TOP) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y + 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */};
    }
    if (this.direction === DIRECTION.BOTTOM) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y - 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */};
    }
    this.snakeCoordinates.push(newBodyCoordinates);
  }

  changeDirection(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.direction = DIRECTION.RIGHT;
/*       this.snakeCoordinates[0].horizontal = true; */
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.direction = DIRECTION.LEFT;
/*       this.snakeCoordinates[0].horizontal = true; */
    }
    if (event.keyCode === KEY_CODE.TOP_ARROW) {
      this.direction = DIRECTION.TOP;
/*       this.snakeCoordinates[0].horizontal = false; */
    }
    if (event.keyCode === KEY_CODE.BOTTOM_ARROW) {
      this.direction = DIRECTION.BOTTOM;
/*       this.snakeCoordinates[0].horizontal = false; */
    }
  }

  /**
 * Get the key up event
 * @param event 
 */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    let keyCode = null;
    this.changeDirection(event);
    if (event.key !== undefined && event.key === " ") {
      if (this.state === STATE.ACTIVE)
        this.pauseGame();
      else
        this.beginGame();
    }
    else if (event.keyCode !== undefined && event.keyCode === KEY_CODE.SPACE) {
      if (this.state === STATE.ACTIVE)
        this.pauseGame();
      else
        this.beginGame();
    }
  }

  /**
   * Stop the game
   */
  pauseGame() {
    this.state = STATE.INACTIVE;
    this.incrementPosition.unsubscribe();
  }

  /**
   * Snake body item takes the position of the item in front of it
   */
  moveSnakeBody() {
    let keepInMemory: CELL = this.snakeCoordinates[0];
    let keepInMemory2: CELL;
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

  /**
   * The snake head changes its position according to the arrow key entered
   */
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
    if (this.state === STATE.INACTIVE) {
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
    this.state = STATE.ACTIVE;
  }

  /**
   * Important function that allows to have an updated y variable in the html file
   * 
   * @param index 
   * @param item 
   */
  trackByFn(index, item) {
    this.y = index;
  }

  /**
   * Allows to show the "Begin" button or the "Pause" button
   * 
   * @param button 
   */
  canShowSpecificButton(button: number) {
    if (button === this.state)
      return true;
    return false;
  }
}