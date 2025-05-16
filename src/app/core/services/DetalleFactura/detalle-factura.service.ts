import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../models/ApiResponse';
import { DetalleFactura } from '../../models/DetalleFactura/DetalleFactura';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductoMasVendido } from '../../models/ProductoMasVendido/ProductoMasVendido';

@Injectable({
  providedIn: 'root',
})
export class DetalleFacturaService {
  private baseUrl =`${environment.apiUrl}DetalleFactura`;

  constructor(private readonly http: HttpClient) {}

  getDetallesFactura(
    nroFactura: number
  ): Observable<ApiResponse<DetalleFactura[]>> {
    return this.http.get<ApiResponse<DetalleFactura[]>>(
      `${this.baseUrl}/get-facturas/${nroFactura}`
    );
  }

  crearDetalleFactura(
    detalle: DetalleFactura
  ): Observable<ApiResponse<DetalleFactura>> {
    return this.http.post<ApiResponse<DetalleFactura>>(this.baseUrl, detalle);
  }

  getProductosMasVendidos(fechaInicio: string, fechaFin: string): Observable<ProductoMasVendido[]> {
    const body = {
      fechaInicio,
      fechaFin
    };

    return this.http.post<ProductoMasVendido[]>(`${this.baseUrl}/producto-mas-vendido`, body);
  }
}
