import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { Graph } from '../models/graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  //selectedGraph: Graph;
  readonly URL_API = 'http://ubiquitous.csf.itesm.mx/~pddm-1020736/content/Deacero/Servicios/';

  constructor(private http: HttpClient) {
    //this.selectedGraph = new Graph();
   }

   getDataGraph( table, month, year ) {
      const heads = new HttpHeaders({'Content-Type': 'application/json'});

      return this.http.get('/api/servicio.mes-anio.php', {
        params : {
          tabla: table,
          mes: month,
          anio: year
        },
        observe: 'response',
        headers: heads
      })
   }
}
