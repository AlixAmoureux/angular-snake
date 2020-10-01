import { TestBed } from '@angular/core/testing';

import { MoveSnakeService } from './move-snake.service';

describe('MoveSnakeService', () => {
  let service: MoveSnakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveSnakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
