import { Injectable } from '@angular/core';
import { LEVEL } from '../object/Level';

@Injectable({
  providedIn: 'root'
})
export class GetMainInfoService {

  constructor() { }

  public getSpeed(level: LEVEL): number {
    if (level === LEVEL.EASY)
      return 180;
    else if (level === LEVEL.MEDIUM)
      return 150;
    else if (level === LEVEL.HARD)
      return 120;
    else
      return 180;
  }

  public getSize(level: LEVEL): number[] {
    if (level === LEVEL.EASY)
      return [50, 30];
    else if (level === LEVEL.MEDIUM)
      return [35, 25];
    else if (level === LEVEL.HARD)
      return [30, 20];
    else
      return [50, 30];
  }
}
