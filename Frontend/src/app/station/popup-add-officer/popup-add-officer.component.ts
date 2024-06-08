import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { StationService } from 'src/app/services/station.service';
import { DialogData } from 'src/app/shared/popup-registration/popup-registration.component';

@Component({
  selector: 'app-popup-add-officer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-add-officer.component.html',
  styleUrl: './popup-add-officer.component.scss'
})
export class PopupAddOfficerComponent {
  registrationForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupAddOfficerComponent>,
    private stationService: StationService,
  ) {
    this.registrationForm = this.formBuilder.group({
      officer_ID: ['', [Validators.required]],
      username: ['', [Validators.required]],
      nic: ['', [Validators.required, Validators.pattern('^[0-9]{9}[vVxX]$'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      conPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  hide = true;
  showPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  hideConPassword = true;
  showConPassword(event: MouseEvent) {
    this.hideConPassword = !this.hideConPassword;
    event.stopPropagation();
  }

  onSubmit(): void {
    this.loading = true;

    const credentials = {
      officer_ID: this.registrationForm.value.officer_ID,
      username: this.registrationForm.value.username,
      nic: this.registrationForm.value.nic,
      password: this.registrationForm.value.password,
    };

    if (this.registrationForm.invalid) {
      this.loading = false;
      return;
    }

    if (this.registrationForm.value.password !== this.registrationForm.value.conPassword) {
      this.registrationForm.controls['conPassword'].setErrors({ notMatched: true });
      this.loading = false;
      return;
    }

    this.stationService.addOfficer(credentials).subscribe({
      error: (error) => {
        if (error.status === 409) {
          this.registrationForm.controls['username'].setErrors({ alreadyExists: true });
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.stationService.loadOfficersInStationFromServer();
        this.dialogRef.close('success');
      }
    });
  }
}
