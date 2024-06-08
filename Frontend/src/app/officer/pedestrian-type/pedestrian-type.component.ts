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
      nicNumber: [''],
      passport_number: [''],
    });
  }

  onSubmit() {
    this.loading = true;

    const body = {
      nicNumber: this.pedForm.value.nicNumber,
      passport_number: this.pedForm.value.passport_number
    }

    if (!this.pedForm.value.nicNumber && !this.pedForm.value.passport_number) {
      this.pedForm.controls['nicNumber'].setErrors({ required: true });
      this.pedForm.controls['passport_number'].setErrors({ required: true });
      this.loading = false;
    }

    this.officerService.checkNICorPassport(body).subscribe({
      next: (response) => {
        this.router.navigate([`officer/pedestrian/${response.idNumber.trim()}/dashboard`]);
      },
      error: (error) => {
        this.pedForm.controls['nicNumber'].setErrors({ invalid: true });
        this.pedForm.controls['passport_number'].setErrors({ invalid: true });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
