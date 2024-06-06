import { Component } from '@angular/core';
import { IconsModule } from 'src/app/modules/icons.module';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfficerService } from 'src/app/services/officer.service';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-pedestrian-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    MatUiModule,
  ],
  templateUrl: './pedestrian-type.component.html',
  styleUrl: './pedestrian-type.component.scss'
})
export class PedestrianTypeComponent {
  pedForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private officerService: OfficerService,
    private formBuilder: FormBuilder
  ) {
    this.pedForm = this.formBuilder.group({
      nic_number: [''],
      passport_number: [''],
    });
  }

  onSubmit() {
    this.loading = true;

    const body = {
      nic_number: this.pedForm.value.nic_number,
      passport_number: this.pedForm.value.passport_number
    }

    if (!this.pedForm.value.nic_number && !this.pedForm.value.passport_number) {
      this.pedForm.controls['nic_number'].setErrors({ invalid: true });
      this.pedForm.controls['passport_number'].setErrors({ invalid: true });
      this.loading = false;
    }

    this.officerService.checkNicorPassport(body).subscribe({
      next: (response) => {
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        this.pedForm.controls['nic_number'].setErrors({ invalid: true });
        this.pedForm.controls['passport_number'].setErrors({ invalid: true });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
