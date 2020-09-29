import { Component, OnInit, Input } from '@angular/core';
import { DIRECTION } from '../../object/Direction';

@Component({
  selector: 'app-box-snake-head',
  templateUrl: './box-snake-head.component.html',
  styleUrls: ['./box-snake-head.component.css']
})
export class BoxSnakeHeadComponent implements OnInit {

  DIRECTION = DIRECTION;
  public _direction: DIRECTION;
  @Input("direction")
  get direction(): DIRECTION {
    return this._direction;
  }
  set direction(tmpDirection: DIRECTION) {
    this._direction = tmpDirection;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
