import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { StationService } from 'src/app/services/station.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUiModule } from 'src/app/modules/matui.module';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatDialog } from '@angular/material/dialog';
import { PopupAddOffenceComponent } from '../popup-add-offence/popup-add-offence.component';

@Component({
  selector: 'app-cases-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatUiModule,
    IconsModule,
    BaseChartDirective,
  ],
  templateUrl: './cases-dashboard.component.html',
  styleUrls: ['./cases-dashboard.component.scss']
})
export class CasesDashboardComponent implements OnInit {
  constructor(public stationService: StationService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.stationService.loadFineRecords();
    this.refreshDashboard();
  }

  @ViewChild(BaseChartDirective) casesDashboard!: BaseChartDirective;
  refreshDashboard() {
    this.stationService.fineRecords$.subscribe((fineRecords) => {
      let driverFinesAccordingToMonth = Array(12).fill(0);
      let pedestrianFinesAccordingToMonth = Array(12).fill(0);

      fineRecords.forEach(fineRecord => {
        const date = new Date(fineRecord.createdAt);
        const month = date.getMonth();
        const fineAmount = fineRecord.totalFine;
        const fineType = fineRecord.Offences[0].offenceType;

        if (fineType === 'Driver') {
          driverFinesAccordingToMonth[month] += 1;
        } else {
          pedestrianFinesAccordingToMonth[month] += 1;
        }
      });

      this.lineChartData.datasets[0].data = driverFinesAccordingToMonth;
      this.lineChartData.datasets[1].data = pedestrianFinesAccordingToMonth;
    });
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

  // Replace the sample data with your dataset for drivers and pedestrians
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
}
