import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { PopupViolationSelectionComponent } from '../popup-violation-selection/popup-violation-selection.component';
import { OfficerService } from 'src/app/services/officer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-violater-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class OfficerDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'fine_id', 'offence_description', 'case_or_fine', 'fine_date', 'fine_amount', 'payment_status'
  ];

  constructor(
    private route: ActivatedRoute,
    public officerService: OfficerService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    const idNumber = this.route.snapshot.paramMap.get('id');
    this.officerService.getViolaterDetails(idNumber ? idNumber : '');
  }

  redirectToDriver() {
    const currentUrl = this.router.url;
    const url = currentUrl.replace('pedestrian', 'driver');
    this.router.navigate([url]);
  }

  redirectToPedestrian() {
    const currentUrl = this.router.url;
    const url = currentUrl.replace('driver', 'pedestrian');
    this.router.navigate([url]);
  }

  openAddCaseDialog(): void {
    const dialogRef = this.dialog.open(PopupViolationSelectionComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  goBack() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Back',
        message: 'Are you sure you want to go back?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/officer/type-selection']);
      } else {
        dialogRef.close();
      }
    });
  }
}