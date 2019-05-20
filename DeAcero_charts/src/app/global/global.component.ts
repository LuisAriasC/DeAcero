import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { Chart } from 'angular-highcharts';

import HighchartsMoreModule from 'highcharts/highcharts-more';
import NetworkgraphModule from 'highcharts/modules/networkgraph';
import OrganizationModule from 'highcharts/modules/organization';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
  providers: [GraphService]
})
export class GlobalComponent implements OnInit {

  public entryChart;
  public chart;
  public outhart;

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {

    this.graphService.getDataGraph('Entrada', 1, 2018).subscribe(
      response => {
        const myJSON = JSON.stringify(response);
        const graph = JSON.parse(myJSON);
        let body = graph.body;
        console.log(body);
        let len = body['Datos'].length;

        let dat = [];
        let dateStr: string;
        let d: string;
        let day: number;
        let i: number;
        let tons = 0;
        let tonsStr;
        let di = 1;

        // Llenado de días con info de api
        for(i = 0; i < len; i++){
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

        let t_days = 31;
        for(i = di - 1; i < t_days; i++) {
          dat.push(0.0);
        }

        this.chart = new Chart({
          title: {
            text: 'Entradas'
          },
          xAxis: {
            type: 'datetime'
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              pointStart: Date.UTC(2018, 0, 1),
              pointIntervalUnit: 'day'
            }
          },
          series: [
            {
              name: 'Toneladas',
              data: dat,
              type: 'column',
              color: 'green'
            }
          ]
        });
      }
    );
  }

}
