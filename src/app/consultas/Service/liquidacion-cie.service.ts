import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ItemsCIE } from '../class/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiquidacionCIEService {

  constructor(private http: HttpClient) {}
  search(query: string): Observable<ItemsCIE> {
    //const url = 'http://api-laravel.net/api/iss2001';
    const url = 'http://xhygnusnews.com/app/public/api/Cie10';
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
