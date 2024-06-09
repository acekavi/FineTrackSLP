import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { IconsModule } from 'src/app/modules/icons.module';
import { MatUiModule } from 'src/app/modules/matui.module';
import { OfficerService } from 'src/app/services/officer.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Offence } from 'src/global-types';

@Component({
  selector: 'app-popup-add-fine',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatUiModule,
    IconsModule,
  ],
  templateUrl: './popup-add-fine.component.html',
  styleUrls: ['./popup-add-fine.component.scss']
})
export class PopupAddFineComponent implements OnInit {
  finesForm!: FormGroup;
  offences: Offence[] = [];
  selectedOffences: Offence[] = [];
  loading: boolean = false;
  options: string[] = [];
  filteredOptions$: Observable<string[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<PopupAddFineComponent>,
    private officerService: OfficerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private utilityService: UtilityService,
    private http: HttpClient,
  ) {
    const url = this.router.url;
    const offenceType = url.includes('driver') ? 'Driver' : 'Pedestrian';

    this.officerService.getOffences(offenceType).subscribe({
      next: (offences) => {
        this.offences = offences;
      }
    });

    this.finesForm = this.formBuilder.group({
      fineDescription: [''],
      location: ['', [Validators.required]],
      locationLink: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.http.get<string[]>('assets/cities.json').subscribe({
      next: (cities: string[]) => {
        this.options = cities;
      }
    });

    this.filteredOptions$ = this.finesForm.get('location')?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._filter(value ?? ''))
    );
  }

  addOffence(offenceId: number) {
    const offence = this.offences.find(o => o.offenceId === offenceId);
    if (offence && !this.selectedOffences.includes(offence)) {
      this.selectedOffences.push(offence);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  removeOffence(offenceId: number) {
    this.selectedOffences = this.selectedOffences.filter(o => o.offenceId !== offenceId);
  }

  onSubmit() {
    this.loading = true;
    const url = this.router.url;

    const body = {
      nicNumber: '',
      offenceIds: this.selectedOffences.map(offence => offence.offenceId),
      fineDescription: this.finesForm.value.fineDescription,
      locationName: this.finesForm.value.location,
      locationLink: this.finesForm.value.locationLink,
      isDriver: url.includes('driver') ? true : false,
    }

    if (body.offenceIds.length === 0) {
      this.utilityService.displaySnackbar('Please select at least one offence', 'error-snack');
      this.loading = false;
      return;
    }

    if (this.finesForm.invalid) {
      this.loading = false;
      return;
    }

    this.officerService.addFineToViolator(body).subscribe({
      next: (response) => {
        this.dialogRef.close('success');
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }
}
