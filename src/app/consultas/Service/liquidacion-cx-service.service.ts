import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Items, GithubApi } from '../class/interface';
import {AppConfiguration} from '../../../../config'


export interface PeriodicElement {
  name: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', email: 'H'},
  {name: 'Helium', email: 'He'},
 
];

@Injectable({
  providedIn: 'root'
})
export class LiquidacionCxServiceService {

  constructor(private http: HttpClient) {}

  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';

  getAllArticles() {
       return ELEMENT_DATA;
   }
   
   getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }

  search(query: string): Observable<Items> {
    //const url = 'http://api-laravel.net/api/iss2001';
    const url = 'http://xhygnusqx.siasgestioncontrol.com/public/api/iss2001';
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
