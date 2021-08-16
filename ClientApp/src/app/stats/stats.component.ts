import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ConsentService } from '../services/consent-service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: []}
  ];

  constructor(private _consentService: ConsentService) {
  }

  async ngOnInit() {
    const stats = await this._consentService.getStats();
    stats.forEach(stat => {
      this.barChartLabels.push(`${stat.userName} - ${stat.webSite}`);
      this.barChartData[0].data.push(stat.count);
    });
  }
}
