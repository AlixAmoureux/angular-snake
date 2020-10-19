import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PopupInfoComponent } from './popup-info.component';

describe('PopupInfoComponent', () => {
  let component: PopupInfoComponent;
  let fixture: ComponentFixture<PopupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
