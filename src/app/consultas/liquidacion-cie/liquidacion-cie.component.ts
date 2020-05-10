import { Component, OnInit, Inject } from "@angular/core";
import { ItemsCIE } from "../class/interface";
import { Observable } from "rxjs/internal/Observable";
import { FormControl } from "@angular/forms";
import { LiquidacionCIEService } from "../Service/liquidacion-cie.service";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { startWith, debounceTime, switchMap } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource, MatDialog } from "@angular/material";

@Component({
  selector: "app-liquidacion-cie",
  templateUrl: "./liquidacion-cie.component.html",
  styleUrls: ["./liquidacion-cie.component.scss"],
})
export class LiquidacionCIEComponent implements OnInit {
  constructor(
    private _service: LiquidacionCIEService,
    public dialog: MatDialog
  ) {}

  displayedColumns = [
    "cod",
    "name",
    "liminferior",
    "limsuperior",
    "sexo",
    "eliminar",
  ];

  private element: Array<any>;
  public dataSource = new MatTableDataSource();
  public _serviceAutocomplete$: Observable<ItemsCIE> = null;
  public autoCompleteControl = new FormControl();

  lookup(value: string): Observable<ItemsCIE> {
    return this._service.search(value.toLowerCase()).pipe(
      // map the item property of the _service results as our return object
      map((results) => results),
      catchError((_) => {
        return of(null);
      })
    );
  }

  ngOnInit() {
    this._serviceAutocomplete$ = this.autoCompleteControl.valueChanges.pipe(
      startWith(""),
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          return this.lookup(value);
        } else {
          return of(null);
        }
      })
    );

    console.log(this.autoCompleteControl);
  }

  selection = new SelectionModel<ItemsCIE>(true, []);
  public selectionChange(item: ItemsCIE) {
    /* this.element = this.dataSource.data;
    this.element.filter(function (element) {
      this.dataSource.data.splice( this.dataSource.data.indexOf(element), 1 );
    }); */
    this.dataSource.data.push(item);
    this.dataSource.filter = "";
  }

  onDelete(id) {
    
    var existe = false;

    if (this.dataSource) {
      for (var i = 0; i <= this.dataSource.data.length; i++) {
        if (this.dataSource.data[i]) {
          
          let codigo :any;
          codigo = this.dataSource.data[i];

          if(codigo.cod === id){
            this.dataSource.data.splice(i, 1);
          
            this.dataSource.filter = "";
          }

             existe = true;
        }
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentCIE);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: "dialog-content-CIE",
  templateUrl: "./dialog/dialog-content-CIE.html",
})
export class DialogContentCIE {}
