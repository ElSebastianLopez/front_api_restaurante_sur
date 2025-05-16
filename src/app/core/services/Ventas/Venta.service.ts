import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { Venta } from '../../models/Venta/Venta';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private baseUrl =
    `${environment.apiUrl}Ventas`;

  constructor(private readonly http: HttpClient) {}

  getVentas(parametrosConsulta: any): Observable<ApiResponse<Venta>> {
    return this.http.post<ApiResponse<Venta>>(
      `${this.baseUrl}/get-ventas`,
      parametrosConsulta
    );
  }
}
