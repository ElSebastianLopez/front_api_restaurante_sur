import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cliente } from '../../models/Clientes/Cliente';
import { ApiResponse } from '../../models/ApiResponse';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

private baseUrl = `${environment.apiUrl}Cliente`;

  constructor(private readonly http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<ApiResponse<Cliente[]>>(this.baseUrl)
      .pipe(
        map((response: ApiResponse<Cliente[]>) => {
          if(response.success){
            return response.data;
          } else {
            throw new Error(response.message || 'Error al obtener clientes');
          }
        })
      );
  }

  getTodosLosClientesConConsumo(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/cliente-consumo`);
  }

}
