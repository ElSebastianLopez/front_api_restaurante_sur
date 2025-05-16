/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetalleFacturaService } from './detalle-factura.service';

describe('Service: DetalleFactura', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleFacturaService]
    });
  });

  it('should ...', inject([DetalleFacturaService], (service: DetalleFacturaService) => {
    expect(service).toBeTruthy();
  }));
});
