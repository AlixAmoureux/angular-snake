import { Component, OnInit, Input } from '@angular/core';
import { DIRECTION } from '../../object/Direction';

@Component({
  selector: 'app-box-snake-body',
  templateUrl: './box-snake-body.component.html',
  styleUrls: ['./box-snake-body.component.css']
})
export class BoxSnakeBodyComponent implements OnInit {

  DIRECTION = DIRECTION;
  public _direction: DIRECTION;
  @Input('direction')
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
