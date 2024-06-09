import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { PopupAddFineComponent } from '../popup-add-fine/popup-add-fine.component';

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
    private dialog: MatDialog
  ) { }

  onSueCaseClick(): void {
    this.dialogRef.close('fine');
  }

  onFineCaseClick(): void {
    const dialogRef = this.dialog.open(PopupAddFineComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.dialogRef.close('fine');
      }
      if (result === 'cancel') {
        return;
      }
    });

  }
}
