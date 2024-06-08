import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { OfficerService } from 'src/app/services/officer.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Offence } from 'src/global-types';

@Component({
  selector: 'app-popup-add-fine',
  standalone: true,
  imports: [
    CommonModule,
    MatUiModule,
    IconsModule,
  ],
  templateUrl: './popup-add-fine.component.html',
  styleUrl: './popup-add-fine.component.scss'
})
export class PopupAddFineComponent {
  offences: Offence[] = []; // Replace with your actual offences data
  selectedOffences: Offence[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopupAddFineComponent>,
    private officerService: OfficerService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
  ) {
    const url = this.router.url;
    const offenceType = url.includes('driver') ? 'Driver' : 'Pedestrian';

    this.officerService.getOffences(offenceType).subscribe({
      next: (offences) => {
        this.offences = offences;
      }
    });
  }

  addOffence(offenceId: number) {
    const offence = this.offences.find(o => o.offenceId === offenceId);
    if (offence && !this.selectedOffences.includes(offence)) {
      this.selectedOffences.push(offence);
    }
  }

  addFineToUser() {
    const url = this.router.url;
    const nicNumber = this.route.snapshot.paramMap.get('id');
    const body = {
      nicNumber: nicNumber ? nicNumber : '',
      offenceIds: this.selectedOffences.map(offence => offence.offenceId),
      locationName: "Test Location",
      locationLink: "https://www.google.com/maps",
      isDriver: url.includes('driver') ? true : false,
    }

    if (body.offenceIds.length === 0) {
      this.utilityService.displaySnackbar('Please select at least one offence', 'error-snack');
      return;
    }

    this.officerService.addFineToViolator(body);
    this.dialogRef.close('success');
  }
}
