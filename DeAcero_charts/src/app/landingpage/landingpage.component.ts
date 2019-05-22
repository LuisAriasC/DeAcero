import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chart = new Chart({
    title: {
      text: 'Entrada'
    },

    xAxis: {
      type: 'datetime'
    },

    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        pointStart: Date.UTC(2019, 0, 1),
        pointIntervalUnit: 'day'
      }
    },

    series: [
      {
        name: "Toneladas",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        type: "line"
      }, {
        name: "Toneladas",
        data: [144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2],
        type: "line"
      }

    ]


  });

  chart2 = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Salida 1'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Toneladas',
        data: [{ y: 2000, x: 1, color: 'green' },
        { y: 8000, x: 2, color: 'blue' },
        { y: 10000, x: 3, color: 'red' },
        { y: 4000, x: 4, color: 'orange' },
        { y: 6000, x: 5, color: 'brown' }],
        type: "bar"
      }
    ]
  });

  chart3 = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Salida 2'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Toneladas',
        data: [{ y: 2752, x: 1, color: 'black' },
        { y: 5369, x: 2, color: 'yellow' },
        { y: 6245, x: 3, color: 'red' },
        { y: 7510, x: 4, color: 'blue' },
        { y: 3500, x: 5, color: 'pink' }],
        type: "column"
      }
    ]
  });

  chart4 = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Predicciones'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Toneladas',
        data: [{ y: 2000, x: 1, color: 'green' },
        { y: 8000, x: 2, color: 'blue' },
        { y: 10000, x: 3, color: 'red' },
        { y: 4000, x: 4, color: 'orange' },
        { y: 6000, x: 5, color: 'brown' }],
        type: "spline"
      }
    ]
  });

}
