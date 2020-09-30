import { Component, OnInit, HostListener } from '@angular/core';
import { interval } from 'rxjs';
import { CELL } from '../../object/Cell';
import { KEY_CODE } from '../../object/KeyCode';
import { DIRECTION } from '../../object/Direction';
import { STATE } from '../../object/State';
import { LEVEL } from '../../object/Level';
import { GetMainInfoService } from '../../service/get-main-info.service';

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
  public foodCoordinates: CELL = new CELL();
  public state: STATE = STATE.INACTIVE;
  public score: number = 0;
  public level: LEVEL = LEVEL.EASY;
  public speed: number = 180;
  _LEVEL = LEVEL;

  constructor(public getMainInfoService: GetMainInfoService) {
  }

  ngOnDestroy() {
    this.size_width = [];
    this.size_height = [];
    this.snakeCoordinates = [];
    this.foodCoordinates = null;
    this.initVariables();
  }

  ngOnInit(): void {
    this.setCoordinates();
  }

  setCoordinates() {
    this.snakeCoordinates = [{ x: 0, y: 0/* , horizontal: true */ }];
    this.setNewFoodCoordinates();
    this.score = 0;
  }

  initVariables() {
    this.snakeCoordinates = [{ x: 0, y: 0/* , horizontal: true */ }];
    this.size_width = new Array<number>(this.getMainInfoService.getSize(this.level)[0]);
    this.size_height = new Array<number>(this.getMainInfoService.getSize(this.level)[1]);
    this.speed = this.getMainInfoService.getSpeed(this.level);
    this.direction = DIRECTION.RIGHT;
    this.y = 0;
    this.state = STATE.INACTIVE;
    this.score = 0;
    this.setNewFoodCoordinates();
  }

  setNewFoodCoordinates() {
    this.foodCoordinates.x = Math.round(Math.random() * (this.getMainInfoService.getSize(this.level)[0] + 1));
    this.foodCoordinates.y = Math.round(Math.random() * (this.getMainInfoService.getSize(this.level)[1] + 1));
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
      this.score++;
      return true;
    }
    return false;
  }

  isSnakeEatingItself(snakeHead: CELL): boolean {
    let isEatingItself: boolean = false;
    this.snakeCoordinates.forEach(function (part, index) {
      if (index > 0) {
        if ((this[index].x === snakeHead.x) && (this[index].y === snakeHead.y)) {
          isEatingItself = true;
        }
      }
    }, this.snakeCoordinates);
    return isEatingItself;
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
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x - 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (this.direction === DIRECTION.LEFT) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x + 1, y: lastSnakeItemCoordinates.y/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (this.direction === DIRECTION.TOP) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y + 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
    }
    if (this.direction === DIRECTION.BOTTOM) {
      newBodyCoordinates = { x: lastSnakeItemCoordinates.x, y: lastSnakeItemCoordinates.y - 1/* , horizontal : lastSnakeItemCoordinates.horizontal  */ };
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
        this.stopGame();
      else
        this.beginGame();
    }
    else if (event.keyCode !== undefined && event.keyCode === KEY_CODE.SPACE) {
      if (this.state === STATE.ACTIVE)
        this.stopGame();
      else
        this.beginGame();
    }
  }

  /**
   * Snake body item takes the position of the item in front of it
   */
  moveSnakeBody(snakeHead: CELL) {
    let keepInMemory: CELL;
    let keepInMemory2: CELL;
    this.snakeCoordinates.forEach(function (part, index) {
      keepInMemory2 = this[index];
      if (index === 1) {
        this[index] = snakeHead;
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
   * Important function that allows to have an updated y variable in the html file
   * 
   * @param index 
   * @param item 
   */
  trackByFn(index, item) {
    this.y = index;
  }


  /**
 * Stop the game
 */
  stopGame() {
    this.initVariables();
    this.incrementPosition.unsubscribe();
  }

  /**
  * Begin the game and automatically move the snake
  */
  beginGame() {
    if (this.state === STATE.INACTIVE) {
      this.incrementPosition = interval(this.speed).subscribe(n => {
        let snakeHead: CELL = Object.assign({}, this.snakeCoordinates[0]);
        this.moveSnakeBody(snakeHead);
        this.moveSnakeHead();
        this.manageBorder();
        this.isSnakeEatingItself(snakeHead);
        if (this.isSnakeEatingFood()) {
          this.increaseSnakeSize();
          this.setNewFoodCoordinates();
        }
      });
    }
    this.state = STATE.ACTIVE;
  }

  beginStopGame(gameStatus: number) {
    if (gameStatus === 0)
      this.stopGame();
    else
      this.beginGame();
  }
}