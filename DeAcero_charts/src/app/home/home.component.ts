import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chart = new Chart({
    chart: {
      type: 'waterfall'
  },
  title: {
      text: 'Eficiencia'
  },
  tooltip: {
      shared: true
  },
  xAxis: {
      categories: ['0', '1', '2', '1. Intermediate Sum', '4',  '2. Intermediate Sum', '6', 'Sum']
  },
  yAxis: {
      tickInterval: 10
  },
  plotOptions: {
      series: {
          stacking: 'normal',
          lineWidth: 1
      }
  },
  series: [{
      data: [10, 10, 30, {
          isIntermediateSum: true
      }, 20, {
          isIntermediateSum: true
      }, 10, {
          isSum: true,
      }],
      type:"column"
  }, {
      data: [-20, -10, -20, {
          isIntermediateSum: true
      }, 10, {
          isIntermediateSum: true
      }, -20, {
          isSum: true
      }],
      type:"column"
  }, {
      data: [-20, 10, 10,  {
          isIntermediateSum: true
      }, 30, {
          isIntermediateSum: true
      }, -10, {
          isSum: true
      }],
      type:"column"
  }]

  });

  chart2 = new Chart({
    chart: {
      type: 'area'
    },

    title: {
      text: 'Paros por Mes'
    },

    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    plotOptions: {
      series: {
        threshold: Infinity
      }
    },

    series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      type: "area"
    }]
    
  });

}
