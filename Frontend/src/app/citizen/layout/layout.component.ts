import { AsyncPipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { } from 'rxjs';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';
import { OfficerService } from 'src/app/services/officer.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-citizen-layout',
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
export class CitizenLayoutComponent implements OnInit {
  constructor(
    private location: Location,
    private dialog: MatDialog,
    private router: Router,
    public citizenService: CitizenService,
    public utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.citizenService.loadCitizenFromServer();
  }

  goBack() {
    if (this.router.url === '/citizen/type-selection') {
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
