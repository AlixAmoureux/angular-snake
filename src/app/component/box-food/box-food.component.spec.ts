import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFoodComponent } from './box-food.component';

describe('BoxFoodComponent', () => {
  let component: BoxFoodComponent;
  let fixture: ComponentFixture<BoxFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
