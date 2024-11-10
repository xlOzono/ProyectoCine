import { TestBed } from '@angular/core/testing';

import { MovieShowService } from './movie-show.service';

describe('MovieShowService', () => {
  let service: MovieShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
