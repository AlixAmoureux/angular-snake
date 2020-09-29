import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAreaComponent } from './component/game-area/game-area.component';
import { GameAreaLineComponent } from './component/game-area-line/game-area-line.component';
import { BoxEmptyComponent } from './component/box-empty/box-empty.component';
import { BoxFoodComponent } from './component/box-food/box-food.component';
import { BoxWallComponent } from './component/box-wall/box-wall.component';
import { BoxSnakeBodyComponent } from './component/box-snake-body/box-snake-body.component';
import { BoxSnakeHeadComponent } from './component/box-snake-head/box-snake-head.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SnakeBodyComponent } from './component/box-snake-body/snake-body/snake-body.component';

@NgModule({
  declarations: [
    AppComponent,
    GameAreaComponent,
    GameAreaLineComponent,
    BoxEmptyComponent,
    BoxFoodComponent,
    BoxWallComponent,
    BoxSnakeBodyComponent,
    BoxSnakeHeadComponent,
    SnakeBodyComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
