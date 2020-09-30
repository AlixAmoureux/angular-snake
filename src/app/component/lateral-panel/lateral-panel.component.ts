import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { STATE } from '../../object/State';
import { LEVEL } from '../../object/Level';

@Component({
  selector: 'app-lateral-panel',
  templateUrl: './lateral-panel.component.html',
  styleUrls: ['./lateral-panel.component.css']
})
export class LateralPanelComponent implements OnInit {

  @Input('state') _state: STATE;
  get state(): STATE {
    return this._state;
  }
  set state(tmpState: STATE) {
    this._state = tmpState;
  }
  @Input('score') _score: number;
  get score(): number {
    return this._score;
  }
  set score(tmpScore: number) {
    this._score = tmpScore;
  }
  @Input('level') _level: LEVEL;
  get level(): LEVEL {
    return this._level;
  }
  set level(tmpLevel: LEVEL) {
    this._level = tmpLevel;
  }
  _LEVEL = LEVEL;
  @Output() beginStopGame = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
 * Allows to show the "Begin" button or the "Pause" button
 * 
 * @param button 
 */
  canShowSpecificButton(button: number) {
    if (button === this._state)
      return true;
    return false;
  }

  /**
   * Change the status of the game (begin or end)
   * 
   * @param gameStatus 0 = stop, 1 = begin
   */
  beginOrStopGame(gameStatus: number) {
    this.beginStopGame.emit(gameStatus);
  }
}
