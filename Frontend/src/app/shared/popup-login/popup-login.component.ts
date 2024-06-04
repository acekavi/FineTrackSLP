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
  selector: 'app-popup-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule
  ],

  templateUrl: './popup-login.component.html',
  styleUrls: ['./popup-login.component.scss']
})
export class PopupLoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupLoginComponent>,
    private authService: AuthUserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
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

  onSubmit(): void {
    this.loading = true;

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.authService.login(this.data.role, credentials).subscribe({
      error: (error) => {
        console.error(error);
        this.loginForm.controls['password'].setErrors({ wrongCredentials: true });
        this.loginForm.controls['username'].updateValueAndValidity();
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.dialogRef.close(this.data.role);
      }
    });
  }
}
