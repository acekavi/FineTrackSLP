import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { PopupViolationSelectionComponent } from '../popup-violation-selection/popup-violation-selection.component';
import { OfficerService } from 'src/app/services/officer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IconsModule,
    MatUiModule,
    DatePipe,
    NgIf
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.officerService.getViolatorFineRecords()
  }
  openAddCaseDialog(): void {
    const dialogRef = this.dialog.open(PopupViolationSelectionComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}