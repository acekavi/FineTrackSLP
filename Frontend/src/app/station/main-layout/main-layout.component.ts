import { Component } from '@angular/core';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { AsyncPipe, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    MatUiModule,
    AsyncPipe
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class StationLayoutComponent {

  constructor(
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    public stationService: StationService,
  ) {
    this.stationService.loadStationFromServer();
  }

  goBack() {
    if (this.router.url === '/station/dashboard') {
      this.logOut();
    } else {
      this.location.back();
    }
  }

  logOut() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Logout',
        message: 'Are you sure you want to logout?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.utilityService.logoutUser();
      } else {
        dialogRef.close();
      }
    });
  }
}
