import { TestBed } from '@angular/core/testing';

import { DataSaveService } from './data-save.service';

describe('DataSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSaveService = TestBed.get(DataSaveService);
    expect(service).toBeTruthy();
  });
});
