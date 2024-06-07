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
  violator: any;
  displayedColumns: string[] = [
    'fine_ID', 'total_fine', 'total_score', 'fine_date', 'fine_time',
    'location_name', 'location_link', 'isDriver', 'is_payed', 'pay_reference_id'
  ];

  constructor(
    private route: ActivatedRoute,
    private officerService: OfficerService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const nic = this.route.snapshot.paramMap.get('nic')!;
    this.officerService.getViolatorDetails(nic).subscribe(data => {
      this.violator = data;
    });
  }

  openAddCaseDialog(): void {
    const dialogRef = this.dialog.open(PopupViolationSelectionComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}