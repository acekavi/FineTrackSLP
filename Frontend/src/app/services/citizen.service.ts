import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import { Citizen, DrLicence, FineRecord, FineRecordWithOffences, FullCitizen, MessageResponse, NIC, VehicleType } from 'src/global-types';

interface MessagewithFineRecord extends MessageResponse {
  fineRecord: FineRecord;
}

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = environment.apiUrl;

  private citizenUserSubject: BehaviorSubject<FullCitizen>;
  public citizenUser$: Observable<FullCitizen>;

  private citizenFineRecordsSubject: BehaviorSubject<FineRecord[]>;
  public citizenFineRecords$: Observable<FineRecord[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.citizenUserSubject = new BehaviorSubject<FullCitizen>({} as FullCitizen);
    this.citizenUser$ = this.citizenUserSubject.asObservable();

    this.citizenFineRecordsSubject = new BehaviorSubject<FineRecord[]>([]);
    this.citizenFineRecords$ = this.citizenFineRecordsSubject.asObservable();
  }

  private fetchCitizenUser(): Observable<FullCitizen> {
    const getUserUrl = `${this.apiUrl}/citizen/details`;
    return this.http.get<FullCitizen>(getUserUrl);
  }

  public loadCitizenFromServer(): void {
    if (!this.utilityService.getAuthorizationToken) {
      return;
    }

    this.fetchCitizenUser().subscribe({
      next: (user: FullCitizen) => {
        console.log(user);
        this.citizenUserSubject.next(user);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        this.utilityService.logoutUser();
      }
    });
  }

  public fetchCitizenFineRecords(): void {
    this.http.get<FineRecordWithOffences[]>(`${this.apiUrl}/citizen/fine-records`)
      .subscribe({
        next: ((response: FineRecordWithOffences[]) => {
          this.citizenFineRecordsSubject.next(response);
        }),
        error: ((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.citizenFineRecordsSubject.next([]);
            return;
          }
          this.utilityService.handleHttpError(error);
        })
      });
  }

  public checkFine(body: { fineId: string }): Observable<FineRecord> {
    return this.http.post<FineRecord>(`${this.apiUrl}/citizen/check-fine`, body);
  }

  public payFine(body: { fineId: string }): Observable<MessagewithFineRecord> {
    return this.http.post<MessagewithFineRecord>(`${this.apiUrl}/citizen/pay-fine`, body);
  }
} 
