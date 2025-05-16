import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../../models/Mesa/Mesa';
import { ApiResponse } from '../../models/ApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private baseUrl =`${environment.apiUrl}Mesa`;

  constructor(private readonly http: HttpClient) {}

  getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.baseUrl);
  }
}
