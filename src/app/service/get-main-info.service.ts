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
      return [28, 22];
    else if (level === LEVEL.MEDIUM)
      return [25, 20];
    else if (level === LEVEL.HARD)
      return [25, 20];
    else
      return [25, 20];
  }

  public canCrossBorder(level: LEVEL): boolean {
    if (level === LEVEL.EASY)
      return true;
    else
      return false;
  }

  public getWallNumber(level: LEVEL): number {
    if (level === LEVEL.MEDIUM)
      return 5;
    else if (level === LEVEL.HARD)
      return 10;
    else
      return 0;
  }
}
