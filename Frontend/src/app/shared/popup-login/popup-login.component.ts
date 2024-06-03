import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { CitizenService } from 'src/app/services/citizen.service';

export interface DialogData {
  LoginInformation: string;
}

@Component({
  selector: 'app-popup-login',
  standalone: true,
  imports: [
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-login.component.html',
  styleUrl: './popup-login.component.scss'
})
export class PopupLoginComponent {
  constructor(public dialogRef: MatDialogRef<PopupLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private citizenService: CitizenService,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  hide = true;
  showPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onLoginClick(): void {
    this.citizenService.loginUser({
      username: "samankumara",
      password: "testpassword123"
    }).subscribe((response) => {
      this.dialogRef.close('login');
    });
  }
}
