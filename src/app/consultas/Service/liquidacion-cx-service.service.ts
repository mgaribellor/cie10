import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Items } from '../class/interface';
@Injectable({
  providedIn: 'root'
})
export class LiquidacionCxServiceService {

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Items> {
    //const url = 'http://api-laravel.net/api/iss2001';
    const url = 'http://xhygnusnews.com/app/public/api/iss2001';
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
