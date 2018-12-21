import { Component, OnInit } from '@angular/core';
import { ItemsCIE } from '../class/interface';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { LiquidacionCIEService } from '../Service/liquidacion-cie.service';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-liquidacion-cie',
  templateUrl: './liquidacion-cie.component.html',
  styleUrls: ['./liquidacion-cie.component.scss']
})
export class LiquidacionCIEComponent implements OnInit {

  constructor(private _service: LiquidacionCIEService, private http: HttpClient) { }

  displayedColumns = ['cod', 'name', 'liminferior', 'limsuperior', 'sexo'];

  private element: Array<any>;
  public dataSource = new MatTableDataSource();
  public _serviceAutocomplete$: Observable<ItemsCIE> = null;
  public autoCompleteControl = new FormControl();

  lookup(value: string): Observable<ItemsCIE> {
    return this._service.search(value.toLowerCase()).pipe(
      // map the item property of the _service results as our return object
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this._serviceAutocomplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    );
  }

  selection = new SelectionModel<ItemsCIE>(true, []);
  public selectionChange(item: ItemsCIE) {
    this.element = this.dataSource.data;
    this.element.filter(function (element) {
      return element.cod == item.cod;
    });
    this.dataSource.data.push(item);
    this.dataSource.filter = "";
  }
}
