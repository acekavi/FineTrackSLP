import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { StationService } from 'src/app/services/station.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUiModule } from 'src/app/modules/matui.module';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatDialog } from '@angular/material/dialog';
import { PopupAddOffenceComponent } from '../popup-add-offence/popup-add-offence.component';
import { FineRecord, FineRecordWithOffences } from 'src/global-types';

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
  @ViewChild(BaseChartDirective) barChart: BaseChartDirective<'bar'> | undefined;
  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective<'pie'> | undefined;
  @ViewChild(BaseChartDirective) lineChart: BaseChartDirective<'line'> | undefined;

  constructor(public stationService: StationService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    this.stationService.loadStationFromServer();
  }

  ngOnInit(): void {
    this.stationService.fineRecords$.subscribe((fineRecords: FineRecordWithOffences[]) => {
      this.updateLineChartData(fineRecords);
      this.updatePieChartData(fineRecords);
      this.updateBarChartData(fineRecords);
    });
  }


  refreshDashboard() {
    this.lineChart?.update();
    this.pieChart?.update();
    this.barChart?.update();
    this.cdRef.detectChanges();
  }

  updateLineChartData(fineRecords: FineRecordWithOffences[]) {
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

    this.lineChartData.datasets[0].data = driverFinesAccordingToMonth;
    this.lineChartData.datasets[1].data = pedestrianFinesAccordingToMonth;
    this.lineChart?.update();
    this.cdRef.detectChanges();
  }

  updatePieChartData(fineRecords: FineRecordWithOffences[]) {
    let finesByDay = Array(7).fill(0);

    fineRecords.forEach(fineRecord => {
      const date = new Date(fineRecord.createdAt);
      const day = date.getDay();  // Get the day of the week (0 - Sunday, 6 - Saturday)
      finesByDay[day]++;
    });

    this.pieChartData.datasets[0].data = finesByDay;
    this.pieChart?.update();
    this.cdRef.detectChanges();
  }

  updateBarChartData(fineRecords: FineRecordWithOffences[]) {
    let sueCasesByDay = Array(7).fill(0);
    const now = new Date();

    fineRecords.forEach(fineRecord => {
      const fineDate = new Date(fineRecord.fineDate);
      const diffDays = Math.floor((now.getTime() - fineDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays >= 14 && diffDays < 21) {
        const day = (diffDays - 14) % 7;
        sueCasesByDay[day]++;
      }
    });

    this.barChartData.datasets[0].data = sueCasesByDay;
    this.barChart?.update();
    this.cdRef.detectChanges();
  }

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

  // Line Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [30, 25, 45, 50, 55, 60, 70, 75, 80, 85, 90, 95],
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
        data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
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
        data: [4, 5, 8, 1, 0, 9, 3],
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
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
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

  public barChartData: ChartData<'bar'> = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      { data: [3, 5, 4, 1, 8, 7, 3], label: 'Upcoming Sue Cases' },
    ],
  };
}