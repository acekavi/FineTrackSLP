import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';
import { OfficerService } from 'src/app/services/officer.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-citizen-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class CitizenDashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'fine_id', 'offence_description', 'case_or_fine', 'fine_date', 'fine_amount', 'payment_status'
  ];

  constructor(
    public citizenService: CitizenService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.citizenService.loadCitizenFromServer();
    this.citizenService.fetchCitizenFineRecords();
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
        this.router.navigate(['/citizen/type-selection']);
      } else {
        dialogRef.close();
      }
    });
  }
}
