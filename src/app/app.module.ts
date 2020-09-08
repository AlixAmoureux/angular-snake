import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameAreaComponent } from './game-area/game-area.component';
import { GameAreaLineComponent } from './game-area-line/game-area-line.component';
import { BoxEmptyComponent } from './box-empty/box-empty.component';
import { BoxFoodComponent } from './box-food/box-food.component';
import { BoxWallComponent } from './box-wall/box-wall.component';
import { BoxSnakeBodyComponent } from './box-snake-body/box-snake-body.component';
import { BoxSnakeHeadComponent } from './box-snake-head/box-snake-head.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
