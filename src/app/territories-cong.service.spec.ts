import { TestBed } from '@angular/core/testing';

import { TerritoriesCongService } from './territories-cong.service';

describe('TerritoriesCongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TerritoriesCongService = TestBed.get(TerritoriesCongService);
    expect(service).toBeTruthy();
  });
});
