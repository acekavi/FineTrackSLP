import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { OfficerService } from 'src/app/services/officer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-driver-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './driver-type.component.html',
  styleUrl: './driver-type.component.scss'
})
export class DriverTypeComponent {
  driverForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private officerService: OfficerService,
    private formBuilder: FormBuilder,
  ) {
    this.driverForm = this.formBuilder.group({
      nicNumber: [''],
      licenceNumber: [''],
    });
  }

  onSubmit() {
    this.loading = true;

    const body = {
      nicNumber: this.driverForm.value.nicNumber,
      licenceNumber: this.driverForm.value.licenceNumber
    }

    if (!this.driverForm.value.nicNumber && !this.driverForm.value.licenceNumber) {
      this.driverForm.controls['nicNumber'].setErrors({ required: true });
      this.driverForm.controls['licenceNumber'].setErrors({ required: true });
      this.loading = false;
    }

    this.officerService.checkDriverLicence(body).subscribe({
      next: (response) => {
        this.router.navigate([`officer/driver/${response.idNumber.trim()}/dashboard`]);
      },
      error: (error) => {
        if (error.status === 404 && error.error.message === 'Invalid licence number!') {
          this.driverForm.controls['licenceNumber'].setErrors({ invalid: true });
          this.driverForm.controls['nicNumber'].setErrors(null);
        } else if (error.status === 404 && error.error.message === 'Invalid NIC number!') {
          this.driverForm.controls['nicNumber'].setErrors({ invalid: true });
          this.driverForm.controls['licenceNumber'].setErrors(null);
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
