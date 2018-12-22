import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class AppSettings  {
    public Version = 1;
    public Autor = 'Jhon Tovar';
    public Date  = 'Diciembre 2018';  
    public HOST = 'https://xhygnusnews.com';   
}