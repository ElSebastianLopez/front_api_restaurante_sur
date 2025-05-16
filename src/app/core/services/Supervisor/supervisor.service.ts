import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { Supervisor } from '../../models/Supervisor/Supervisor';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  private readonly baseUrl =
    `${environment.apiUrl}Supervisor`;

  constructor(private readonly http: HttpClient) {}

  getSupervisores(): Observable<ApiResponse<Supervisor[]>> {
    return this.http.get<ApiResponse<Supervisor[]>>(this.baseUrl);
  }
}
