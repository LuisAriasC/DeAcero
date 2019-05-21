import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
  providers: [GraphService]
})
export class AreaComponent implements OnInit {

  public entryChart;
  public chart;
  public chart2;
  public chart3;
  public chart4;
  public chart5;
  public outhart;
  private nfLigthTable: string;
  private datanfLight: number[];
  private h2Table: string;
  private dataH2: number[];
  private h34Table: string;
  private dataH34: number[];
  private h4Table: string;
  private dataH4: number[];

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {

    const month = 1;
    const month2 = 2;
    const year = 2019;
    const day = 0;

    this.nfLigthTable = 'Non_Ferrous_Light';
    this.graphService.getDataGraph( this.nfLigthTable, month, year).subscribe(
      response => {
        this.datanfLight = this.prepareJSON(response);
        this.chart = this.createChart(year, day, month, this.nfLigthTable, this.datanfLight);
      }
    );

    this.h2Table = 'Heavy_2';
    this.graphService.getDataGraph( this.h2Table, month, year).subscribe(
      response => {
        this.dataH2 = this.prepareJSON(response);
        this.chart2 = this.createChart(year, day, month, this.h2Table, this.dataH2);
      }
    );

    this.h34Table = 'Heavy_3_4';
    this.graphService.getDataGraph( this.h34Table, month, year).subscribe(
      response => {
        this.dataH34 = this.prepareJSON(response);
        this.chart3 = this.createChart(year, day, month, this.h34Table, this.dataH34);
      }
    );
  }

  createDonut( title: string,  y1: number, table1: string, y2: number, table2: string ) {

    const chart = new Chart({
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

  createChart( year: number, day: number, month: number, table: string, data: number[] ) {
    console.log(data);
    console.log(this.prepareData(data, month));
    const chart = new Chart({
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
          data: this.prepareData(data, month),
          type: 'column',
          color: 'green'
        }
      ]

    });

    return chart;
  }

  createChart2( year, day, month, name, table1, data1, table2, data2 ) {

    const chart = new Chart({
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
    const body = graph.body;
    return body;
  }

  prepareData(body, month: number) {
    console.log(body);
    console.log(month);
    const datos = 'Datos';
    const fecha = 'Fecha';
    const toneladas = 'Toneladas'
    const len = body[datos].length;
    const dat = [];
    let dateStr: string;
    let d: string;
    let day: number;
    let i: number;
    let tons = 0;
    let tonsStr: string;
    let di = 1;

    // Llenado de días con info de api
    for (i = 0; i < len; i++) {
      dateStr = body[datos][i][fecha];
      tonsStr = body[datos][i][toneladas];
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

    for (i = di - 1; i < days; i++) {
      dat.push(0.0);
    }
    return dat;
  }
//
//  chart3 = new Chart({
//    chart: {
//      type: 'line'
//    },
//    title: {
//      text: 'Ferroso Pesado'
//    },
//    credits: {
//      enabled: false
//    },
//    series: [
//      {
//        name: 'Toneladas',
//        data: [{ y: 2752, x: 1, color: 'black' },
//        { y: 5369, x: 2, color: 'yellow' },
//        { y: 6245, x: 3, color: 'red' },
//        { y: 7510, x: 4, color: 'blue' },
//        { y: 3500, x: 5, color: 'pink' }],
//        type: "column"
//      }
//    ]
//  });
//
//  chart4 = new Chart({
//    chart: {
//      type: 'line'
//    },
//    title: {
//      text: 'Otro'
//    },
//    credits: {
//      enabled: false
//    },
//    series: [
//      {
//        name: 'Toneladas',
//        data: [{ y: 2000, x: 1, color: 'green' },
//        { y: 8000, x: 2, color: 'blue' },
//        { y: 10000, x: 3, color: 'red' },
//        { y: 4000, x: 4, color: 'orange' },
//        { y: 6000, x: 5, color: 'brown' }],
//        type: "spline"
//      }
//    ]
//  });
//
}
