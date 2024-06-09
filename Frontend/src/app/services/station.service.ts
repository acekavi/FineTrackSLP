import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { FineRecordWithOffences, MessageResponse, Officer, Station } from 'src/global-types';
import { BehaviorSubject, catchError, Observable, Subscription, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = environment.apiUrl;
  private stationUserSubject: BehaviorSubject<Station | null>;
  public stationUser$: Observable<Station | null>;

  private officersInStationSubject: BehaviorSubject<Officer[]>;
  public officersInStation$: Observable<Officer[]>;

  private fineRecordsSubject: BehaviorSubject<FineRecordWithOffences[]>;
  public fineRecords$: Observable<FineRecordWithOffences[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.stationUserSubject = new BehaviorSubject<Station | null>(null);
    this.stationUser$ = this.stationUserSubject.asObservable();

    this.officersInStationSubject = new BehaviorSubject<Officer[]>([]);
    this.officersInStation$ = this.officersInStationSubject.asObservable();

    this.fineRecordsSubject = new BehaviorSubject<FineRecordWithOffences[]>([]);
    this.fineRecords$ = this.fineRecordsSubject.asObservable();
  }

  private fetchStationUser(): Observable<Station> {
    const stationUrl = `${this.apiUrl}/station/details`;
    return this.http.get<Station>(stationUrl)
  }

  public loadStationFromServer(): void {
    if (!this.utilityService.getAuthorizationToken) {
      return;
    }

    this.fetchStationUser().subscribe({
      next: (user: Station) => {
        this.stationUserSubject.next(user);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        this.utilityService.logoutUser();
      }
    });
  }

  private getOfficersInStation(): Observable<Officer[]> {
    const stationUrl = `${this.apiUrl}/station/officers`;
    return this.http.get<Officer[]>(stationUrl)
  }

  public loadOfficersInStationFromServer(): void {
    this.getOfficersInStation().subscribe({
      next: (officers: Officer[]) => {
        this.officersInStationSubject.next(officers);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
      }
    });
  }

  public addOfficer(body: {
    officer_ID: string,
    username: string,
    nic: string,
    password: string,
  }): Observable<MessageResponse> {
    const addOfficerUrl = `${this.apiUrl}/station/add-officer`;
    return this.http.post<MessageResponse>(addOfficerUrl, body).pipe(
      tap((response) => {
        this.utilityService.displaySnackbar(response.message, 'success-snack');
      })
    );
  }

  public addOffence(body: {
    offence_type: string,
    description: string,
    score: number,
    fee: number,
    enabled: boolean,
  }): Observable<MessageResponse> {
    const addOffenceUrl = `${this.apiUrl}/station/add-offence`;
    return this.http.post<MessageResponse>(addOffenceUrl, body).pipe(
      tap((response) => {
        this.utilityService.displaySnackbar(response.message, 'success-snack');
      })
    );
  }

  public loadFineRecords(): void {
    const fineRecordsUrl = `${this.apiUrl}/station/fine-records`;
    this.http.get<FineRecordWithOffences[]>(fineRecordsUrl).subscribe({
      next: (fineRecords: FineRecordWithOffences[]) => {
        this.fineRecordsSubject.next(fineRecords);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
      }
    });
  }
}
