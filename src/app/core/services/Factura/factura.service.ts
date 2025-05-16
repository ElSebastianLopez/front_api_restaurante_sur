import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../../models/Factura/Factura';
import { ApiResponse } from '../../models/ApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private baseUrl =`${environment.apiUrl}Factura`;

  constructor(private readonly http: HttpClient) {}

  getFacturas(): Observable<Factura[]> {
    return new Observable<Factura[]>((observer) => {
      this.http.get<ApiResponse<Factura[]>>(this.baseUrl).subscribe({
        next: (res) => {
          if (res.success) {
            observer.next(res.data);
            observer.complete();
          } else {
            observer.error(new Error(res.message));
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }

  crearFactura(factura: Factura): Observable<ApiResponse<Factura>> {
    return this.http.post<ApiResponse<Factura>>(this.baseUrl, factura);
  }
}
