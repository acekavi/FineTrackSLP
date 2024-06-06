import { Component } from '@angular/core';
import { MatUiModule } from '../../modules/matui.module';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { NIC } from 'src/global-types';
import { OfficerService } from 'src/app/services/officer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private officerService: OfficerService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      licence_number: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.officerService.checkDriverLicence(this.loginForm.value.licence_number).subscribe({
      next: (response) => {
        console.log(response.NIC)
      },
      error: (error) => {
        this.loginForm.controls['licence_number'].setErrors({ invalid: true });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
