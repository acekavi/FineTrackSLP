import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  // popup-login.component.ts
  onLoginClick(): void {
    this.dialogRef.close('login');
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  hide = true;
  showPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
