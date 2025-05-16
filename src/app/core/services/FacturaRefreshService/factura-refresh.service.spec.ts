/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacturaRefreshService } from './factura-refresh.service';

describe('Service: FacturaRefresh', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturaRefreshService]
    });
  });

  it('should ...', inject([FacturaRefreshService], (service: FacturaRefreshService) => {
    expect(service).toBeTruthy();
  }));
});
