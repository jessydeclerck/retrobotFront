import { TestBed } from '@angular/core/testing';

import { BotApiService } from './bot-api.service';

describe('BotApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotApiService = TestBed.get(BotApiService);
    expect(service).toBeTruthy();
  });
});
