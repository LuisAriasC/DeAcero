import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';
//import { create } from 'domain';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
  providers: [GraphService]
})
export class GlobalComponent implements OnInit {

  public entryChart;
  public chart;
  public chart2;
  public chart3;
  public outhart;
  private entryTable: string;
  private principalTable: string;
  private FTTable: string;
  private dataEntry: number[];
  private dataPrincipal: number[];
  private dataFT: number[];

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {

    const month = 1;
    const month2 = 2;
    const year = 2018;
    const day = 0;

    this.entryTable = 'Entrada';
    // Crea grafico para entradas 
    this.graphService.getDataGraph( this.entryTable, month, year).subscribe(
      response => {
        this.dataEntry = this.prepareJSON(response);
        this.chart = this.createChart(year, day, month, this.entryTable, this.dataEntry);
      }
    );

    this.principalTable = 'Principal';
    // Crea grafico para salida 1 
    this.graphService.getDataGraph( this.principalTable, month, year).subscribe(
      response => {
        this.dataPrincipal = this.prepareJSON(response);
        this.FTTable = 'Ferrous_Tramp';
        // Crea grafico para salida 2
        this.graphService.getDataGraph( this.FTTable, month2, year).subscribe(
          response2 => {
            this.dataFT = this.prepareJSON(response2);
            this.chart2 = this.createChart2(year, day, month, 'Salidas', this.principalTable, this.dataPrincipal, this.FTTable, this.dataFT);
            //this.chart3 = this.createDonut('Salidas', 90, this.principalTable, 10, this.FTTable);
          }
        );
      }
    );
  }

  createDonut( title, y1, table1 ,y2, table2 ){

    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: title
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Porcentaje',
          data: [
            {y: y1, color: 'green', name: table1},
            {y: y2, color: 'blue', name: table2}
          ],
          type: 'pie'
        }
      ]
    });

    return chart;
  }

  createChart( year, day, month, table, data_ ) {
    let chart = new Chart({
      title: {
        text: table
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        type: 'linear'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(year, day, month),
          pointIntervalUnit: 'day'
        }
      },
      series: [
        {
          name: 'Toneladas',
          data: this.prepareData(data_, month),
          type: 'column',
          color: 'green'
        }
      ]
    });

    return chart;
  }

  createChart2( year, day, month, name, table1, data1, table2, data2 ) {

    let chart = new Chart({
      title: {
        text: name
      },
      xAxis: {
        type: 'datetime'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(year, day, month),
          pointIntervalUnit: 'day'
        }
      },
      series: [
        {
          name: table1,
          data: this.prepareData(data1, month),
          type: 'line'
        },
        {
          name: table2,
          data: this.prepareData(data2, month),
          type: 'line'
        }
      ]
    });
    return chart;
  }

  prepareJSON(response) {
    const myJSON = JSON.stringify(response);
    const graph = JSON.parse(myJSON);
    let body = graph.body;
    return body;
  }

  prepareData(body, month) {
    let len = body['Datos'].length;
    let dat = [];
    let dateStr: string;
    let d: string;
    let day: number;
    let i: number;
    let tons = 0;
    let tonsStr: string;
    let di = 1;

    // Llenado de días con info de api
    for(i = 0; i < len; i++) {
      dateStr = body['Datos'][i]['Fecha'];
      tonsStr = body['Datos'][i]['Toneladas'];
      d = dateStr.substring(8, 10);
      day = parseInt(d, 10);
      tons = parseInt(tonsStr, 10);
      while (di !== day) {
        dat.push(0.0);
        di++;
      }
      dat.push(tons);
      di++;
    }

    let days = 0;
    if ( month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      days = 31;
    } else if ( month === 4 || month === 6 || month === 9 || month === 11) {
      days = 30;
    } else {
      days = 28;
    }

    for(i = di - 1; i < days; i++) {
      dat.push(0.0);
    }
    return dat;
  }

}
