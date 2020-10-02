import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LEVEL } from '../../object/Level';
import { GetMainInfoService } from '../../service/get-main-info.service';

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.css']
})
export class PopupInfoComponent implements OnInit {

  _LEVEL = LEVEL;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public getMainInfoService : GetMainInfoService) { }

  ngOnInit(): void {
  }
}