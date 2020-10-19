import { Component, OnInit, HostListener, Inject, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { CELL } from '../../object/Cell';
import { KEY_CODE } from '../../object/KeyCode';
import { DIRECTION } from '../../object/Direction';
import { STATE } from '../../object/State';
import { LEVEL } from '../../object/Level';
import { GetMainInfoService } from '../../service/get-main-info.service';
import { ErrorManagementService } from '../../service/error-management.service';
import { AddNewItemService } from '../../service/add-new-item.service';
import { MoveSnakeService } from '../../service/move-snake.service';
import { PopupInfoComponent } from '../popup-info/popup-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game-area',
  templateUrl: './game-area.component.html',
  styleUrls: ['./game-area.component.css']
})
export class GameAreaComponent implements OnInit, OnDestroy {

  public sizeWidth;
  public sizeHeight;
  public direction: DIRECTION = DIRECTION.RIGHT;
  public incrementPosition;
  public y = 0;
  public snakeCoordinates: CELL[];
  public foodCoordinates: CELL = new CELL();
  public wallCoordinates: CELL[];
  public state: STATE = STATE.INACTIVE;
  public score = 0;
  public level: LEVEL = LEVEL.EASY;
  public speed = 180;
  public canCrossBorder: boolean;
  public dialogRef;
  _LEVEL = LEVEL;

  constructor(public getMainInfoService: GetMainInfoService, public errorManagementService: ErrorManagementService,
              public addNewItemService: AddNewItemService, public moveSnakeService: MoveSnakeService,
              public dialog: MatDialog) {
  }

  ngOnDestroy() {
    this.sizeWidth = [];
    this.sizeHeight = [];
    this.snakeCoordinates = [];
    this.wallCoordinates = [];
    this.foodCoordinates = null;
    this.initVariables();
  }

  ngOnInit(): void {
    this.initVariables();
    this.openPopup();
  }

  initVariables() {
    this.snakeCoordinates = [{ x: 0, y: 0 }];
    this.wallCoordinates = [];
    this.sizeWidth = new Array<number>(this.getMainInfoService.getSize(this.level)[0]);
    this.sizeHeight = new Array<number>(this.getMainInfoService.getSize(this.level)[1]);
    this.canCrossBorder = this.getMainInfoService.canCrossBorder(this.level);
    this.speed = this.getMainInfoService.getSpeed(this.level);
    this.direction = DIRECTION.RIGHT;
    this.state = STATE.INACTIVE;
    this.y = 0;
    this.score = 0;
    this.addNewItemService.setNewFoodCoordinates(this.foodCoordinates, this.level, this.sizeWidth.length, this.sizeHeight.length);
    if (this.level !== LEVEL.EASY) {
      this.addNewItemService.setNewWallCoordinates(this.foodCoordinates, this.wallCoordinates, this.level,
        this.sizeWidth.length, this.sizeHeight.length);
    }
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

  changeDirection(event: KeyboardEvent) {
    const tmpDirection: DIRECTION = this.direction;
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.direction = DIRECTION.RIGHT;
      if (tmpDirection === DIRECTION.LEFT && this.snakeCoordinates.length > 1) {
        this.stopGame();
      }
    }
    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.direction = DIRECTION.LEFT;
      if (tmpDirection === DIRECTION.RIGHT && this.snakeCoordinates.length > 1) {
        this.stopGame();
      }
    }
    if (event.key === KEY_CODE.TOP_ARROW) {
      this.direction = DIRECTION.TOP;
      if (tmpDirection === DIRECTION.BOTTOM && this.snakeCoordinates.length > 1) {
        this.stopGame();
      }
    }
    if (event.key === KEY_CODE.BOTTOM_ARROW) {
      this.direction = DIRECTION.BOTTOM;
      if (tmpDirection === DIRECTION.TOP && this.snakeCoordinates.length > 1) {
        this.stopGame();
      }
    }
  }

  /**
   * Get the key up event
   * @param event : event of the user input
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    this.changeDirection(event);
    if (event.key !== undefined && event.key === ' ') {
      if (this.state === STATE.ACTIVE) {
        this.stopGame();
      }
      else {
        this.beginGame();
      }
    }
    else if (event.key !== undefined && event.key === KEY_CODE.SPACE) {
      if (this.state === STATE.ACTIVE) {
        this.stopGame();
      }
      else {
        this.beginGame();
      }
    }
  }

  /**
   * Important function that allows to have an updated y variable in the html file
   *
   * @param index : index of the line
   * @param item : item of the line
   */
  trackByFn(index, item) {
    this.y = index;
  }


  /**
   * Stop the game
   */
  stopGame() {
    if (this.state === STATE.ACTIVE) {
      this.incrementPosition.unsubscribe();
    }
    this.initVariables();
  }

  /**
   * Begin the game and automatically move the snake
   */
  beginGame() {
    if (this.state === STATE.INACTIVE) {
      this.incrementPosition = interval(this.speed).subscribe(n => {
        const snakeHead: CELL = Object.assign({}, this.snakeCoordinates[0]);
        if (this.errorManagementService.isSnakeEatingItself(this.snakeCoordinates, snakeHead)) {
          this.stopGame();
        }
        this.moveSnakeService.moveSnakeBody(snakeHead, this.snakeCoordinates);
        this.moveSnakeService.moveSnakeHead(this.direction, this.snakeCoordinates);
        if ((!this.errorManagementService.manageBorderError(this.sizeWidth, this.sizeHeight,
          this.snakeCoordinates, this.direction, this.canCrossBorder)) ||
          (this.errorManagementService.isSnakeCrossingAWall(snakeHead, this.wallCoordinates))) {
          this.stopGame();
        }
        if (this.isSnakeEatingFood()) {
          this.addNewItemService.increaseSnakeSize(this.direction, this.snakeCoordinates);
          this.addNewItemService.setNewFoodCoordinates(this.foodCoordinates, this.level, this.sizeWidth.length, this.sizeHeight.length);
        }
      });
    }
    this.state = STATE.ACTIVE;
  }

  beginStopGame(gameStatus: number) {
    if (gameStatus === 0) {
      this.stopGame();
    }
    else {
      this.beginGame();
    }
  }

  openPopup() {
    this.dialogRef = this.dialog.open(PopupInfoComponent, {
      data: { level: this.level },
      minWidth: '500px',
      minHeight: '250px',
      maxWidth: '1000px',
      maxHeight: '500px',
    });
  }

  changeLevel() {
    this.stopGame();
    this.openPopup();
  }
}
