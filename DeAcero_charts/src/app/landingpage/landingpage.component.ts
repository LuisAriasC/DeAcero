import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  providers: [GraphService]
})
export class LandingpageComponent implements OnInit {
  public entryChart: Chart;
  public chart: Chart;
  public chart2: Chart;
  public chart3: Chart;
  public chart4: Chart;
  public outhart: Chart;
  private entryTable: string;
  private principalTable: string;
  private FTTable: string;
  private dataEntry: number[];
  private dataPrincipal: number[];
  private dataFT: number[];

  public selectedMonth: number;
  public selectedYear: number;
  public selectedYear2: number;
  private simulacion: string;
  private data;

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {

    this.selectedMonth = 4;
    this.selectedYear = 2018;
    this.selectedYear2 = 2020;
    const day = 0;

    this.entryTable = 'Entrada';
    // Crea grafico para entradas 
    this.graphService.getDataGraph(this.entryTable, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataEntry = this.prepareJSON(response);
        this.chart = this.createChart(this.selectedYear, day, this.selectedMonth, this.entryTable, this.dataEntry);
      }
    );



    this.principalTable = 'Principal';
    // Crea grafico para salida 1 
    this.graphService.getDataGraph(this.principalTable, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataPrincipal = this.prepareJSON(response);
        this.FTTable = 'Ferrous_Tramp';
        // Crea grafico para salida 2
        this.graphService.getDataGraph(this.FTTable, this.selectedMonth + 1, this.selectedYear).subscribe(
          response2 => {
            this.dataFT = this.prepareJSON(response2);
            this.chart2 = this.createChart2(this.selectedYear, day, this.selectedMonth, 'Salidas', this.principalTable, this.dataPrincipal, this.FTTable, this.dataFT);
            //this.chart3 = this.createDonut('Salidas', 90, this.principalTable, 10, this.FTTable);
          }
        );
      }
    );

    this.simulacion = 'Simulacion';
    this.graphService.getDataSimulation(this.simulacion, this.selectedYear2).subscribe(
      response => {
        this.data = this.prepareJSON2(response);
        console.log();
        this.chart4 = this.createPrediction(this.selectedYear2, day, 1, this.simulacion, 'Produccion', this.prepareData2(this.data, 1), 'Merma', this.prepareData2(this.data, 0));
      }
    );
  }



  createDonut(title, y1, table1, y2, table2) {

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
            { y: y1, color: 'green', name: table1 },
            { y: y2, color: 'blue', name: table2 }
          ],
          type: 'pie'
        }
      ]
    });

    return chart;
  }

  createChart(year: number, day: number, month: number, table: string, data: number[]) {
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

  createChart2(year, day, month, name, table1, data1, table2, data2) {

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

  prepareData(body, month) {
    const datos = 'Datos';
    const fecha = 'Fecha';
    const toneladas = 'Toneladas';
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
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      days = 31;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      days = 30;
    } else {
      days = 28;
    }

    for (i = di - 1; i < days; i++) {
      dat.push(0.0);
    }
    return dat;
  }


  // event handler for the select month
  selectMonthHandler(event: any) {
    this.selectedMonth = event.target.value;
  }

  // event handler for the select month
  selectYearHandler(event: any) {
    this.selectedYear = event.target.value;
  }



  createPrediction(year, day, month, name, table1, data1, table2, data2) {

    const chart = new Chart({
      title: {
        text: name + ' ' + year
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
          pointIntervalUnit: 'month'
        }
      },
      series: [
        {
          name: table1,
          data: data1,
          color: 'green',
          type: 'line'
        },
        {
          name: table2,
          data: data2,
          color: 'blue',
          type: 'line'
        }
      ]
    });

    return chart;
  }

  prepareJSON2(response) {
    const myJSON = JSON.stringify(response);
    const graph = JSON.parse(myJSON);
    const body = graph.body;
    return body;
  }

  prepareData2(body, dato) {
    //console.log(body);
    //console.log(month);
    const datos = 'Datos';
    let llave = '';
    if (dato === 1) {
      llave = 'Produccion';
    } else {
      llave = 'Merma';
    }

    const len = body[datos].length;
    const dat = [];
    let i: number;
    let datoD = 0;
    let datoStr: string;;

    // Llenado de datos en mes dependiendo del tipo
    for (i = 0; i < len; i++) {
      datoStr = body[datos][i][llave];
      datoD = parseInt(datoStr, 10);
      dat.push(datoD);
    }

    return dat;
  }

}
