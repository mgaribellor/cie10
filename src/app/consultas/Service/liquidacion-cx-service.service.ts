import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Items, User } from '../class/interface';
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
   
  getUser() {
    return this.http.get<any[]>(this.serviceUrl);
  }

  search(query: string): Observable<Items> {
    const url = 'https://api.datamuse.com/words';
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
