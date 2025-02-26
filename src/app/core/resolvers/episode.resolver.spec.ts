import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { episodeResolver } from './episode.resolver';

describe('episodeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => episodeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
