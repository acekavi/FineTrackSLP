import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
import { Citizen, FineRecord, NIC, Offence, OffenceRecord, Officer } from 'src/global-types';
import { environment } from '../enviorenment/dev.enviorenment';

interface NICwithCitizen extends NIC {
  Citizen?: Citizen;
}

interface OffenceResult {
  description: string;
  score: number;
  fee: number;
}

interface FineRecordWithOffences extends FineRecord {
  Offences: OffenceResult[];
}

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = environment.apiUrl;
  private officerUserSubject: BehaviorSubject<Officer>;
  public officerUser$: Observable<Officer>;

  private violaterSubject: BehaviorSubject<NICwithCitizen>;
  public violater$: Observable<NICwithCitizen>;

  private violaterFineRecordsSubject: BehaviorSubject<FineRecord[]>;
  public violaterFineRecords$: Observable<FineRecord[]>;


  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.officerUserSubject = new BehaviorSubject<Officer>({} as Officer);
    this.officerUser$ = this.officerUserSubject.asObservable();

    this.violaterSubject = new BehaviorSubject<NICwithCitizen>({} as NICwithCitizen);
    this.violater$ = this.violaterSubject.asObservable();

    this.violaterFineRecordsSubject = new BehaviorSubject<FineRecord[]>([]);
    this.violaterFineRecords$ = this.violaterFineRecordsSubject.asObservable();
  }

  private fetchOfficerUser(): Observable<Officer> {
    const getUserUrl = `${this.apiUrl}/officer/details`;
    return this.http.get<Officer>(getUserUrl);
  }

  public loadOfficerFromServer(): void {
    if (!this.utilityService.getAuthorizationToken) {
      return;
    }

    this.fetchOfficerUser().subscribe({
      next: (user: Officer) => {
        this.officerUserSubject.next(user);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.utilityService.handleHttpError(error);
        this.utilityService.logoutUser();
      }
    });
  }

  public checkDriverLicence(body: { nicNumber: string, licenceNumber: string }): Observable<NICwithCitizen> {
    const checkDriverInfoUrl = `${this.apiUrl}/officer/check-driver`;
    return this.http.post<NICwithCitizen>(checkDriverInfoUrl, body);
  }

  public checkNICorPassport(body: { nicNumber: string, passport_number: string }): Observable<NICwithCitizen> {
    const checkNicorPassportUrl = `${this.apiUrl}/officer/check-nic-passort`;
    return this.http.post<NICwithCitizen>(checkNicorPassportUrl, body);
  }

  public getViolaterDetails(idNumber: string): void {
    this.http.post<NICwithCitizen>(`${this.apiUrl}/officer/violater/details`, { idNumber }).subscribe({
      next: ((response: NICwithCitizen) => {
        this.violaterSubject.next(response);
        this.getViolatorFineRecords(response.idNumber);
      }),
      error: ((error: HttpErrorResponse) => {
        // handle error
        console.log(error);

        this.utilityService.handleHttpError(error);
      })
    });
  }

  public getViolatorFineRecords(nicNumber: string): void {
    this.http.post<FineRecordWithOffences[]>(`${this.apiUrl}/officer/violater/fine-records`, { nicNumber })
      .subscribe({
        next: ((response: FineRecordWithOffences[]) => {
          console.log(response);
          this.violaterFineRecordsSubject.next(response);
        }),
        error: ((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.violaterFineRecordsSubject.next([]);
            return;
          }
          this.utilityService.handleHttpError(error);
        })
      });
  }

  public addFineToViolator(body: {
    nicNumber: string
    offenceIds: number[],
    locationName: string,
    locationLink: string,
    isDriver: boolean,
  }): void {
    body.nicNumber = this.violaterSubject.value.idNumber.trim();
    this.http.post<FineRecordWithOffences[]>(`${this.apiUrl}/officer/violator/add-fine`, body).subscribe({
      next: ((response: FineRecordWithOffences[]) => {
        this.utilityService.displaySnackbar('Fine added successfully', 'success-snack');
        this.violaterFineRecordsSubject.next(response);
      }),
      error: ((error: HttpErrorResponse) => {
        console.log(error);
        this.utilityService.handleHttpError(error);
      })
    });
  }

  public getOffences(offenceType: string): Observable<Offence[]> {
    const getOffencesUrl = `${this.apiUrl}/station/offences`;
    return this.http.post<Offence[]>(getOffencesUrl, { offence_type: offenceType });
  }
}
