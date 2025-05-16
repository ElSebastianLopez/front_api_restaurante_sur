import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaRefreshService {

 private readonly _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$.asObservable();
  }

  notifyRefresh() {
    this._refreshNeeded$.next();
  }

}
