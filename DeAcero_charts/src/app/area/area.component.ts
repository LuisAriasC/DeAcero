import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { NgForm } from '@angular/forms';
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
  private dataH2;
  private h34Table: string;
  private dataH34;
  private h4Table: string;
  private dataH4;
  private p2Table: string;
  private dataP2;

  public selectedMonth: number;
  public selectedYear: number;

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {
    this.selectedMonth = 1;
    this.selectedYear = 2018;

    const day = 0;

    this.nfLigthTable = 'Non_Ferrous_Light';
    this.graphService.getDataGraph( this.nfLigthTable, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.datanfLight = this.prepareJSON(response);
        this.chart = this.createChart(this.selectedYear, day, this.selectedMonth, this.nfLigthTable, this.datanfLight);
      }
    );

    this.h2Table = 'Heavy_2';
    this.graphService.getDataGraph( this.h2Table, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataH2 = this.prepareJSON(response);
        this.chart2 = this.createChart(this.selectedYear, day, this.selectedMonth, this.h2Table, this.dataH2);
      }
    );

    this.h34Table = 'Heavy_3_4';
    this.graphService.getDataGraph( this.h34Table, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataH34 = this.prepareJSON(response);
        this.chart3 = this.createChart(this.selectedYear, day, this.selectedMonth, this.h34Table, this.dataH34);
      }
    );

    this.h4Table = 'Heavy_4';
    this.graphService.getDataGraph( this.h4Table, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataH4 = this.prepareJSON(response);
        this.chart4 = this.createChart(this.selectedYear, day, this.selectedMonth, this.h4Table, this.dataH4);
      }
    );

    this.p2Table = 'Plus2_Heavy';
    this.graphService.getDataGraph( this.p2Table, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.dataP2 = this.prepareJSON(response);
        this.chart5 = this.createChart(this.selectedYear, day, this.selectedMonth, this.p2Table, this.dataP2);
      }
    );
  }

  editGrapghs( form: NgForm) {
    if ( !this.selectedMonth || !this.selectedYear ) {
      form.reset();
      alert('Faltan valores para obtener información');
    } else {
      //console.log('Edit graphs');
      //console.log(this.selectedMonth);
      //console.log(this.selectedYear);
      this.chart.destroy();
      this.chart2.destroy();
      this.chart3.destroy();
      this.chart4.destroy();
      this.chart5.destroy();
      // Crea grafico para entradas 
      this.graphService.getDataGraph( this.nfLigthTable, this.selectedMonth, this.selectedYear).subscribe(
      response => {
        this.datanfLight = this.prepareJSON(response);
        this.chart = this.createChart(this.selectedYear, 1, this.selectedMonth, this.nfLigthTable, this.datanfLight);
      });

      this.h2Table = 'Heavy_2';
      this.graphService.getDataGraph( this.h2Table, this.selectedMonth, this.selectedYear).subscribe(
        response => {
          this.dataH2 = this.prepareJSON(response);
          this.chart2 = this.createChart(this.selectedYear, 1, this.selectedMonth, this.h2Table, this.dataH2);
        }
      );
  
      this.h34Table = 'Heavy_3_4';
      this.graphService.getDataGraph( this.h34Table, this.selectedMonth, this.selectedYear).subscribe(
        response => {
          this.dataH34 = this.prepareJSON(response);
          this.chart3 = this.createChart(this.selectedYear, 1, this.selectedMonth, this.h34Table, this.dataH34);
        }
      );
  
      this.h4Table = 'Heavy_4';
      this.graphService.getDataGraph( this.h4Table, this.selectedMonth, this.selectedYear).subscribe(
        response => {
          this.dataH4 = this.prepareJSON(response);
          this.chart4 = this.createChart(this.selectedYear, 1, this.selectedMonth, this.h4Table, this.dataH4);
        }
      );
  
      this.p2Table = 'Plus2_Heavy';
      this.graphService.getDataGraph( this.p2Table, this.selectedMonth, this.selectedYear).subscribe(
        response => {
          this.dataP2 = this.prepareJSON(response);
          this.chart5 = this.createChart(this.selectedYear, 1, this.selectedMonth, this.p2Table, this.dataP2);
        }
      );
    }
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

  createChart( year: number, day: number, month: number, table: string, data ) {
    //console.log(data);
    //console.log(this.prepareData(data, month));
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
          pointStart: Date.UTC(year, month - 1, day),
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
          pointStart: Date.UTC(year, month - 1, day),
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
    //console.log(body);
    //console.log(month);
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

  // event handler for the select month
  selectMonthHandler(event: any) {
    this.selectedMonth = event.target.value;
  }
  // event handler for the select month
  selectYearHandler(event: any) {
    this.selectedYear = event.target.value;
  }
}
