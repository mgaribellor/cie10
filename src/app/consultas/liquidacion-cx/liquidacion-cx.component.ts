import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Items, Manual } from '../class/interface';
import { LiquidacionCxServiceService } from '../Service/liquidacion-cx-service.service';
import { Observable, of, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import {startWith,map,debounceTime,switchMap,catchError } from 'rxjs/operators';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liquidacion-cx',
  templateUrl: './liquidacion-cx.component.html',
  styleUrls: ['./liquidacion-cx.component.scss']
})

export class LiquidacionCxComponent implements OnInit, AfterViewInit {

  mans: Manual[] = [
    {value: 'M1', viewValue: 'Manual 1'},
    {value: 'M2', viewValue: 'Manual 2'},
  ];

  displayedColumns = ['cod', 'nom','ane','ayu','cap','des','hom','mat','tot','uvr'];

   columns: Array<any> = [
    { name: 'position', label: 'No.' },
    { name: 'name', label: 'Name' },
    { name: 'weight', label: 'Weight' },
    { name: 'symbol', label: 'Symbol' }
  ];

 // displayedColumns: string[] = this.columns.map(column => column.name);
  
  public githubAutoComplete$: Observable<Items> = null;
  public autoCompleteControl = new FormControl();
  private dataSource = new MatTableDataSource();

  constructor(private githubService: LiquidacionCxServiceService, private http: HttpClient) {}

  lookup(value: string): Observable<Items> {
    return this.githubService.search(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this.githubAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
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


  

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  ngAfterViewInit() {
   
  };

  public selectionChange(item) {  
     var item1 = item;

    this.dataSource.data.push(item);
    this.dataSource.filter = ""; 

    }


}
