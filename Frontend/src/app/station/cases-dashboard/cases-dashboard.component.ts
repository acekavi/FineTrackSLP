import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatUiModule } from 'src/app/modules/matui.module';
import { IconsModule } from 'src/app/modules/icons.module';
import { StationService } from 'src/app/services/station.service';
import { FineRecordWithOffences } from 'src/global-types';
import { MatDialog } from '@angular/material/dialog';
import { PopupAddOffenceComponent } from '../popup-add-offence/popup-add-offence.component';

@Component({
  selector: 'app-cases-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatUiModule,
    IconsModule,
    BaseChartDirective
  ],
  templateUrl: './cases-dashboard.component.html',
  styleUrls: ['./cases-dashboard.component.scss']
})
export class CasesDashboardComponent implements OnInit {

  lineChartDataset: number[][] = [[], []];
  barChartDataset: number[] = [];
  pieChartDataset: number[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private stationService: StationService,
    private dialog: MatDialog,
  ) {
    this.stationService.loadStationFromServer();
  }

  ngOnInit() {
    this.stationService.fineRecords$.subscribe((fineRecords: FineRecordWithOffences[]) => {
      this.lineChartDataset = this.updateLineChartData(fineRecords);
      this.pieChartDataset = this.updatePieChartData(fineRecords);
      this.barChartDataset = this.updateBarChartData(fineRecords);
      this.polarAreaChartData = this.updatePolarAreaChartData(fineRecords);
      this.updateChartData();
    });
  }

  updateChartData() {
    // Line Chart
    this.lineChartData.datasets[0].data = this.lineChartDataset[0];
    this.lineChartData.datasets[1].data = this.lineChartDataset[1];

    // Pie Chart
    this.pieChartData.datasets[0].data = this.pieChartDataset;

    // Bar Chart
    this.barChartData.datasets[0].data = this.barChartDataset;

    // Trigger chart update
    if (this.chart) {
      this.chart.update();
    }
  }

  updateLineChartData(fineRecords: FineRecordWithOffences[]): number[][] {
    let driverFinesAccordingToMonth = Array(12).fill(0);
    let pedestrianFinesAccordingToMonth = Array(12).fill(0);

    fineRecords.forEach(fineRecord => {
      const date = new Date(fineRecord.createdAt);
      const month = date.getMonth();
      const fineType = fineRecord.Offences[0].offenceType;

      if (fineType === 'Driver') {
        driverFinesAccordingToMonth[month] += 1;
      } else {
        pedestrianFinesAccordingToMonth[month] += 1;
      }
    });

    return [driverFinesAccordingToMonth, pedestrianFinesAccordingToMonth];
  }

  updatePieChartData(fineRecords: FineRecordWithOffences[]): number[] {
    let finesByDay = Array(7).fill(0);

    fineRecords.forEach(fineRecord => {
      const date = new Date(fineRecord.createdAt);
      const day = date.getDay();
      finesByDay[day]++;
    });

    return finesByDay;
  }

  updateBarChartData(fineRecords: FineRecordWithOffences[]): number[] {
    let sueCasesByDay = Array(15).fill(0);
    const now = new Date();

    fineRecords.forEach(fineRecord => {
      const fineDate = new Date(fineRecord.fineDate);
      const diffTime = fineDate.getTime() - now.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= -14 && diffDays <= 0) {
        sueCasesByDay[14 + diffDays]++;
      }
    });

    return sueCasesByDay;
  }

  updatePolarAreaChartData(fineRecords: FineRecordWithOffences[]): ChartData<'polarArea'> {
    const finesByLocation: { [key: string]: number } = {};

    fineRecords.forEach(fineRecord => {
      const locationName = fineRecord.locationName || 'Unknown';
      if (!finesByLocation[locationName]) {
        finesByLocation[locationName] = 0;
      }
      finesByLocation[locationName]++;
    });

    const labels = Object.keys(finesByLocation);
    const data = Object.values(finesByLocation);

    return {
      labels,
      datasets: [
        {
          data,
          label: 'Fines by Location',
        }
      ]
    };
  }

  refreshDashboard() {
    console.log('Data Refreshed');
  }

  // Line Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.lineChartDataset[0],
        label: 'Total Driver Fines',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        pointBackgroundColor: 'rgba(54,162,235,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54,162,235,0.8)',
        fill: 'origin',
      },
      {
        data: this.lineChartDataset[1],
        label: 'Total Pedestrian Fines',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  // Pie Chart
  public pieChartData: ChartConfiguration['data'] = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        data: this.pieChartDataset,
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255,206,86,0.2)',
          'rgba(75,192,192,0.2)',
          'rgba(153,102,255,0.2)',
          'rgba(255,159,64,0.2)',
          'rgba(199,199,199,0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54,162,235,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,1)',
          'rgba(199,199,199,1)'
        ],
        borderWidth: 1
      },
    ],
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Bar Chart
  // Generating labels for the next 15 days
  UpcomingSueCasesLabels = Array.from({ length: 15 }, (_, i) => {
    let date = new Date();
    date.setDate(date.getDate() + i);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  });

  public barChartData: ChartConfiguration['data'] = {
    labels: this.UpcomingSueCasesLabels,
    datasets: [
      { data: this.barChartDataset, label: 'Upcoming Sue Cases' },
    ],
  };

  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  // Polar Area Chart
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [],
  };

  public polarAreaChartOptions: ChartConfiguration<'polarArea'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };


  addOffenceDialog() {
    const dialogRef = this.dialog.open(PopupAddOffenceComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
    });
  }
}
