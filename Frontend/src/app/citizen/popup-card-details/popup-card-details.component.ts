import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';
import { FineRecord } from 'src/global-types';

interface PaymentDetails {
  fineId: string;
  totalFine: number;
}

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-card-details.component.html',
  styleUrl: './popup-card-details.component.scss'
})
export class PopupCardDetailsComponent {
  cardForm!: FormGroup;
  loading: boolean = false;
  isSuccessful: boolean = false;

  responseFineRecord: FineRecord = {} as FineRecord;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupCardDetailsComponent>,
    private citizenService: CitizenService,
    @Inject(MAT_DIALOG_DATA) public data: PaymentDetails,
  ) {
    this.cardForm = this.formBuilder.group({
      cardnumber: [0, [Validators.required]],
      expDate: [0, [Validators.required]],
      cvv: [0, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onSubmit(): void {
    this.loading = true;

    const body = {
      fineId: this.data.fineId,
    };

    if (this.cardForm.invalid) {
      this.loading = false;
      return;
    }

    this.citizenService.payFine(body).subscribe({
      next: (response) => {
        this.responseFineRecord = response.fineRecord;
        this.isSuccessful = true;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close('success');
  }

  convertToNumber(value: string): number {
    return Number(value);
  }
}
