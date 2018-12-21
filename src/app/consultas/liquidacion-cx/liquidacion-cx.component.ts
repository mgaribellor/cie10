import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Items, Manual } from '../class/interface';
import { LiquidacionCxServiceService } from '../Service/liquidacion-cx-service.service';
import { Observable, of, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-liquidacion-cx',
  templateUrl: './liquidacion-cx.component.html',
  styleUrls: ['./liquidacion-cx.component.scss']
})

export class LiquidacionCxComponent implements OnInit {

  constructor(private _service: LiquidacionCxServiceService) { }

  //name headers table
  displayedColumns = ['select', 'cod', 'nom', 'ane', 'ayu', 'cap', 'des', 'hom', 'mat', 'tot', 'uvr'];

  private model: number;
  public _serviceAutoComplete$: Observable<Items> = null;
  public autoCompleteControl = new FormControl();
  public dataSource = new MatTableDataSource();
  public showTable: boolean;
  private elementOld: Array<any> = [];

  lookup(value: string): Observable<Items> {
    return this._service.search(value.toLowerCase()).pipe(
      // map the item property of the _service results as our return object
      map(results => results),
      catchError(_ => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this.showTable = false;
    this._serviceAutoComplete$ = this.autoCompleteControl.valueChanges.pipe(
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<Items>(true, []);

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(
        row => this.selection.select());
  }

  
  private element: Array<any>;
  public selectionChange(item: Items) {

    this.showTable = true;
    this.element = this.dataSource.data;
    this.element.filter(function (element) {
      return element.cod == item.cod;
    });
   
      this.dataSource.data.push(item);
      this.elementOld.push(item);
    
    this.dataSource.filter = "";
  }

  onBlurMethod() {    
    this.element = this.elementOld;  
    this.element.map(e => {
      e.tot = e.tot * (this.model / 100)
      return e;
    });
  }
}
