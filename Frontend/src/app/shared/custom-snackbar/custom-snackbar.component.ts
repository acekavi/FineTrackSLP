import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [
    MatUiModule
  ],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) { }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
