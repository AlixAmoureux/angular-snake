import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAreaLineComponent } from './game-area-line.component';

describe('GameAreaLineComponent', () => {
  let component: GameAreaLineComponent;
  let fixture: ComponentFixture<GameAreaLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAreaLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAreaLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
