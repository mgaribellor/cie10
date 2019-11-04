import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ItemsCIE } from '../class/interface';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/assets/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionCIEService {

  constructor(private http: HttpClient,private host: AppSettings) {}
  search(query: string): Observable<ItemsCIE> {
    const url = this.host.HOST +'Cie10';
    return this.http
      .get<ItemsCIE>(url, {
        observe: 'response',
        params: {
          ml: query
        }
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
  
}
