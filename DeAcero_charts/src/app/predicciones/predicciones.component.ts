import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';

@Component({
  selector: 'app-predicciones',
  templateUrl: './predicciones.component.html',
  styleUrls: ['./predicciones.component.css']
})
export class PrediccionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Global'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Consumo',
        data: [
          {name: "Enero", y: 5000},
          {name: "Febrero", y: 8000},
          {name: "Marzo", y: 3000},
          {name: "Abril", y: 4500},
          {name: "Mayo", y: 1800}
        ],
        color: "blue",
        type: "line"
      },
      {
        name: 'Ahorro',
        data: [
          {name: "Enero", y: 2500},
          {name: "Febrero", y: 1500},
          {name: "Marzo", y: 2000},
          {name: "Abril", y: 2000},
          {name: "Mayo", y: 1500}
        ],
        color: "green",
        type: "line"
      },
      {
        name: 'Desperdicio',
        data: [
          {name: "Enero", y: 500},
          {name: "Febrero", y: 2500},
          {name: "Marzo", y: 1000},
          {name: "Abril", y: 600},
          {name: "Mayo", y: 150}
        ],
        color: "black",
        type: "line"
      } 
    ]
  });

}
