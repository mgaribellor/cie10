import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Items } from '../class/interface';
import { AppSettings } from 'src/assets/AppSettings';
@Injectable({
  providedIn: 'root'
})
export class LiquidacionCxServiceService {

  constructor(private http: HttpClient, private host: AppSettings) {}

  search(query: string): Observable<Items> {
    const url = this.host.HOST +'/api/iss2001';
    return this.http
      .get<Items>(url, {
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
