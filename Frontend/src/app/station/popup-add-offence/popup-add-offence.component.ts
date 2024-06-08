import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-popup-add-offence',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule
  ],
  templateUrl: './popup-add-offence.component.html',
  styleUrl: './popup-add-offence.component.scss'
})
export class PopupAddOffenceComponent {
  offenceAddForm!: FormGroup;
  loading: boolean = false;
  selectedOffence: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupAddOffenceComponent>,
    private stationService: StationService,
  ) {
    this.offenceAddForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      score: [0, [Validators.required]],
      fee: [0, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }

  onSubmit(): void {
    this.loading = true;

    const body = {
      offence_type: this.selectedOffence,
      description: this.offenceAddForm.value.description,
      score: this.offenceAddForm.value.score,
      fee: this.offenceAddForm.value.fee,
      enabled: true,
    };

    if (this.offenceAddForm.invalid) {
      this.loading = false;
      return;
    }

    this.stationService.addOffence(body).subscribe({
      error: (error) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.dialogRef.close('success');
      }
    });
  }
}
