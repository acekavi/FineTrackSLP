import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { StationService } from 'src/app/services/station.service';
import { UtilityService } from 'src/app/services/utility.service';
import { PopupAddOfficerComponent } from '../popup-add-officer/popup-add-officer.component';

@Component({
  selector: 'app-officers-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './officers-dashboard.component.html',
  styleUrl: './officers-dashboard.component.scss'
})
export class OfficersDashboardComponent {
  displayedColumns: string[] = [
    'officerId', 'username', 'nicNumber', 'name', 'status'
  ];

  constructor(
    public stationService: StationService,
    public utilityService: UtilityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.stationService.loadOfficersInStationFromServer();
  }

  openAddOfficerDialog() {
    const dialogRef = this.dialog.open(PopupAddOfficerComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
    });
  }

}
