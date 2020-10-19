import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GameAreaComponent } from './game-area.component';

describe('GameAreaComponent', () => {
  let component: GameAreaComponent;
  let fixture: ComponentFixture<GameAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameAreaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
