import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Items } from '../class/interface';
import {AppConfiguration} from '../../../../config'


@Injectable({
  providedIn: 'root'
})
export class LiquidacionCxServiceService {

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Items> {
    const url = 'http://api-laravel.net/api/iss2001';
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
