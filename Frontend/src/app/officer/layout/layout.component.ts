import { AsyncPipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { } from 'rxjs';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { OfficerService } from 'src/app/services/officer.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Officer } from 'src/global-types';

@Component({
  selector: 'app-officer-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class OfficerLayoutComponent implements OnInit {
  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    public officerService: OfficerService,
    public utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.officerService.loadOfficerFromServer();
  }

  goBack() {
    if (this.router.url === '/officer/type-selection') {
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
