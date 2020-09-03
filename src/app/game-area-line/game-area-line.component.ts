import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-game-area-line',
  templateUrl: './game-area-line.component.html',
  styleUrls: ['./game-area-line.component.css']
})
export class GameAreaLineComponent implements OnInit {

  @Input("size") size: number;
  @Input("y") y: number;
  @Input("snakeHead") snakeHead: number[];

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit");
  }
}
