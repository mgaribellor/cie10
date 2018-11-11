import { Component, OnInit } from '@angular/core';
import { Items } from '../class/interface';
import { LiquidacionCxServiceService } from '../Service/liquidacion-cx-service.service';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  catchError
} from 'rxjs/operators';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-liquidacion-cx',
  templateUrl: './liquidacion-cx.component.html',
  styleUrls: ['./liquidacion-cx.component.scss']
})
export class LiquidacionCxComponent implements OnInit {

  foods: Food[] = [
    {value: 'M1', viewValue: 'Manual 1'},
    {value: 'M2', viewValue: 'Manual 2'},

  ];
  
  public githubAutoComplete$: Observable<Items> = null;
  public autoCompleteControl = new FormControl();

  constructor(private githubService: LiquidacionCxServiceService) {}

  lookup(value: string): Observable<Items> {
    return this.githubService.search(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this.githubAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    );
  }

}
