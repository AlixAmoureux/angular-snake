import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeBodyComponent } from './snake-body.component';

describe('SnakeBodyComponent', () => {
  let component: SnakeBodyComponent;
  let fixture: ComponentFixture<SnakeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
