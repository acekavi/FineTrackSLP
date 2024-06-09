import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { AuthUserService } from 'src/app/services/auth-user.service';

export interface DialogData {
  role: 'Citizen' | 'Officer' | 'Station';
}

@Component({
  selector: 'app-popup-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-registration.component.html',
  styleUrls: ['./popup-registration.component.scss']
})
export class PopupRegistrationComponent {
  registrationForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupRegistrationComponent>,
    private authService: AuthUserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conPassword: ['', [Validators.required]],
      nicNumber: ['', [Validators.required, Validators.pattern('^(\\d{9}[vVxX]|\\d{12})$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.minLength(10)]],
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
      nicNumber: this.registrationForm.value.nicNumber,
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      mobile: this.registrationForm.value.mobile,
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

    this.authService.register(credentials).subscribe({
      error: (error) => {
        if (error.status === 409) {
          if (error.error.message === 'Username already exists') {
            this.registrationForm.controls['username'].setErrors({ alreadyExists: true });
          }
          this.registrationForm.controls['nicNumber'].setErrors({ alreadyExists: true });
        } else if (error.status === 422) {
          this.registrationForm.controls['nicNumber'].setErrors({ invalid: true });
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.dialogRef.close('success');
      }
    });
  }
}
