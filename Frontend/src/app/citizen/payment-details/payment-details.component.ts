import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';
import { PopupCardDetailsComponent } from '../popup-card-details/popup-card-details.component';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent {
  paymentForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private citizenService: CitizenService,
    private dialog: MatDialog,
  ) {
    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      fineId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;

    const body = {
      fineId: this.paymentForm.value.fineId,
      totalFine: 0,
    }

    if (this.paymentForm.invalid) {
      this.loading = false;
      return;
    }

    this.citizenService.checkFine(body).subscribe({
      next: (response) => {
        body.totalFine = response.totalFine;
        const dialogRef = this.dialog.open(PopupCardDetailsComponent, {
          data: body,
          disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 'success') {
            this.router.navigate(['citizen/dashboard']);
          }
          if (result === 'cancel') {
            this.loading = false;
            return;
          }
        });
      },
      error: (error) => {
        this.loading = false;
        this.paymentForm.controls['fineId'].setErrors({ invalid: true });
      }
    });
  }
}
