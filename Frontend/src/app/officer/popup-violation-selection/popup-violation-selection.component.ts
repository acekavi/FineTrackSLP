import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';

@Component({
  selector: 'app-popup-violation-selection',
  standalone: true,
  imports: [
    CommonModule,
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-violation-selection.component.html',
  styleUrl: './popup-violation-selection.component.scss'
})
export class PopupViolationSelectionComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupViolationSelectionComponent>,
  ) { }

  onSueCaseClick(): void {
    this.dialogRef.close('sue');
  }

  onFineCaseClick(): void {
    this.dialogRef.close('fine');
  }
}
