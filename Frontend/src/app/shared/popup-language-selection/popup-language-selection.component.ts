import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-popup-language-selection',
  standalone: true,
  imports: [
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-language-selection.component.html',
  styleUrl: './popup-language-selection.component.scss'
})
export class PopupLanguageSelectionComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<PopupLanguageSelectionComponent>) { }

  // popup-language-selection.component.ts
  onSinhalaClick(): void {
    this.dialogRef.close('sinhala');
  }

  onEnglishClick(): void {
    this.dialogRef.close('english');
  }

  onTamilClick(): void {
    this.dialogRef.close('tamil');
  }
}
