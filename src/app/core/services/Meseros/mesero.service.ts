import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesero } from '../../models/Meseros/Mesero';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeseroService {
  private baseUrl =
    `${environment.apiUrl}Mesero`;

  constructor(private readonly http: HttpClient) {}

  getMeseros(): Observable<Mesero[]> {
    return this.http.get<ApiResponse<Mesero[]>>(this.baseUrl).pipe(
      map((response: ApiResponse<Mesero[]>) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message || 'Error al obtener meseros');
        }
      })
    );
  }

  getVentasPorMesero(): Observable<ApiResponse<Mesero[]>> {
    return this.http.get<ApiResponse<Mesero[]>>(`${this.baseUrl}/ventas-mesero`);
  }
}
