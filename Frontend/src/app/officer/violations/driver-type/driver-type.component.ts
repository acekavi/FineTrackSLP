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
      licence_number: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.officerService.checkDriverLicence(this.driverForm.value.licence_number).subscribe({
      next: (response) => {
        this.router.navigate([`officer/driver/${response.idNumber.trim()}/dashboard`]);

      },
      error: (error) => {
        this.driverForm.controls['licence_number'].setErrors({ invalid: true });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
