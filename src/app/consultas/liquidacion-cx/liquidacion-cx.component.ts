import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Items, GithubApi } from '../class/interface';
import { LiquidacionCxServiceService } from '../Service/liquidacion-cx-service.service';
import { Observable, of, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  switchMap,
  catchError  
} from 'rxjs/operators';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface Manual {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-liquidacion-cx',
  templateUrl: './liquidacion-cx.component.html',
  styleUrls: ['./liquidacion-cx.component.scss']
})
export class LiquidacionCxComponent implements OnInit, AfterViewInit {

  //dataSource = new UserDataSource(this.githubService);
  //displayedColumns = ['name', 'email'];


  mans: Manual[] = [
    {value: 'M1', viewValue: 'Manual 1'},
    {value: 'M2', viewValue: 'Manual 2'},

  ];
  
  public githubAutoComplete$: Observable<Items> = null;
  public autoCompleteControl = new FormControl();

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


  
  displayedColumns = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.githubService);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        })        
      ).subscribe(data => this.dataSource.data = data);
  };
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor( private githubService: LiquidacionCxServiceService) {}
  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> { 
    return this.githubService.getRepoIssues(sort,order,page);
  }
}
