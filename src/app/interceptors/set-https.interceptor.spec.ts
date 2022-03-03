import { TestBed } from '@angular/core/testing';

import { SetHttpsInterceptor } from './set-https.interceptor';

describe('SetHttpsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SetHttpsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SetHttpsInterceptor = TestBed.inject(SetHttpsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
