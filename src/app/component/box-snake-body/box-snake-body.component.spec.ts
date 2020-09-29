import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSnakeBodyComponent } from './box-snake-body.component';

describe('BoxSnakeBodyComponent', () => {
  let component: BoxSnakeBodyComponent;
  let fixture: ComponentFixture<BoxSnakeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSnakeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSnakeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
