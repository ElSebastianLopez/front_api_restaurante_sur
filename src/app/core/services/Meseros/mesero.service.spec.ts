/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeseroService } from './mesero.service';

describe('Service: Mesero', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeseroService]
    });
  });

  it('should ...', inject([MeseroService], (service: MeseroService) => {
    expect(service).toBeTruthy();
  }));
});
