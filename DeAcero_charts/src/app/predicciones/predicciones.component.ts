import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { NgForm } from '@angular/forms';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';

@Component({
  selector: 'app-predicciones',
  templateUrl: './predicciones.component.html',
  styleUrls: ['./predicciones.component.css'],
  providers: [GraphService]
})
export class PrediccionesComponent implements OnInit {

  public chart: Chart;
  public selectedYear: number;
  private simulacion: string;
  private data;

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {
    this.selectedYear = 2019;

    const day = 0;

    this.simulacion = 'Simulacion';
    this.graphService.getDataSimulation( this.simulacion, this.selectedYear).subscribe(
      response => {
        this.data = this.prepareJSON(response);
        console.log(response);
        this.chart = this.createPrediction(this.selectedYear, day, 1, this.simulacion, 'Produccion', this.prepareData(this.data, 1), 'Merma', this.prepareData(this.data, 0));
      }
    );
  }

  editGrapghs( form: NgForm) {
    if ( !this.selectedYear ) {
      form.reset();
      alert('Faltan valores para obtener información');
    } else {

      this.chart.destroy();

      // Crea grafico para entradas 
      this.graphService.getDataSimulation( this.simulacion, this.selectedYear).subscribe(
      response => {
        this.data = this.prepareJSON(response);
        this.chart = this.createPrediction(this.selectedYear, 0, 1, this.simulacion, 'Produccion', this.prepareData(this.data, 1), 'Merma', this.prepareData(this.data, 0));
      });
    }
  }

  createPrediction( year, day, month, name, table1, data1, table2, data2 ) {

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

  prepareJSON(response) {
    const myJSON = JSON.stringify(response);
    const graph = JSON.parse(myJSON);
    const body = graph.body;
    return body;
  }

  prepareData(body, dato) {
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

    // event handler for the select month
    selectYearHandler(event: any) {
      this.selectedYear = event.target.value;
    }

}
