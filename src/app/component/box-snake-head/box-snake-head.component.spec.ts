import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSnakeHeadComponent } from './box-snake-head.component';

describe('BoxSnakeHeadComponent', () => {
  let component: BoxSnakeHeadComponent;
  let fixture: ComponentFixture<BoxSnakeHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSnakeHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSnakeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
