import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, interval } from 'rxjs';

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
  public snakeHead: number[] = [0, 0];
  public direction: DIRECTION = DIRECTION.RIGHT;
  public incrementPosition;

  constructor() { }

  ngOnInit(): void {

  }

  /**
   * Replace the head of the snake
   */
  manageBorder() {
    if ((this.snakeHead[0] === 0) && (this.direction === DIRECTION.LEFT))
      this.snakeHead[0] = this.size.length - 1;
    if ((this.snakeHead[0] === this.size.length - 1) && (this.direction === DIRECTION.RIGHT))
      this.snakeHead[0] = 0;
    if ((this.snakeHead[1] === 0) && (this.direction === DIRECTION.TOP))
      this.snakeHead[1] = this.size.length - 1;
    if ((this.snakeHead[1] === this.size.length - 1) && (this.direction === DIRECTION.BOTTOM))
      this.snakeHead[1] = 0;
  }

  /**
   * Get the key up event
   * @param event 
   */
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.keyCode);
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.snakeHead[0]++;
      this.direction = DIRECTION.RIGHT;
    }
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.snakeHead[0]--;
      this.direction = DIRECTION.LEFT;
    }
    if (event.keyCode === KEY_CODE.TOP_ARROW) {
      this.snakeHead[1]--;
      this.direction = DIRECTION.TOP;
    }
    if (event.keyCode === KEY_CODE.BOTTOM_ARROW) {
      this.snakeHead[1]++;
      this.direction = DIRECTION.BOTTOM;
    }
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
    this.incrementPosition = interval(100).subscribe(n => {
      if (this.direction === DIRECTION.LEFT)
        this.snakeHead[0]--;
      else if (this.direction === DIRECTION.RIGHT)
        this.snakeHead[0]++;
      else if (this.direction === DIRECTION.BOTTOM)
        this.snakeHead[1]++;
      else if (this.direction === DIRECTION.TOP)
        this.snakeHead[1]--;

      this.manageBorder();
    });
  }
}
