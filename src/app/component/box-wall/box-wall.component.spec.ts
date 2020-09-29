import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxWallComponent } from './box-wall.component';

describe('BoxWallComponent', () => {
  let component: BoxWallComponent;
  let fixture: ComponentFixture<BoxWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
