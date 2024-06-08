import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
import { Citizen, FineRecord, NIC, OffenceRecord, Officer } from 'src/global-types';
import { environment } from '../enviorenment/dev.enviorenment';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = environment.apiUrl;
  private officerUserSubject: BehaviorSubject<Officer>;
  public officerUser$: Observable<Officer>;

  private violaterSubject: BehaviorSubject<Citizen>;
  public violater$: Observable<Citizen>;

  private violaterFineRecordsSubject: BehaviorSubject<FineRecord[]>;
  public violaterFineRecords$: Observable<FineRecord[]>;


  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.officerUserSubject = new BehaviorSubject<Officer>({} as Officer);
    this.officerUser$ = this.officerUserSubject.asObservable();

    this.violaterSubject = new BehaviorSubject<Citizen>({} as Citizen);
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

  public checkDriverLicence(licence_number: string): Observable<Citizen> {
    const checkDriverInfoUrl = `${this.apiUrl}/officer/check-driver`;
    return this.http.post<Citizen>(checkDriverInfoUrl, { licence_number }).pipe(
      tap((response: Citizen) => {
        this.violaterSubject.next(response);
      })
    );
  }

  public checkNICorPassport(body: { nic_number: string, passport_number: string }): Observable<Citizen> {
    const checkNicorPassportUrl = `${this.apiUrl}/officer/check-nic-passort`;
    return this.http.post<Citizen>(checkNicorPassportUrl, body).pipe(
      tap((response: Citizen) => {
        this.violaterSubject.next(response);
      })
    );
  }

  public getViolatorFineRecords(): void {
    this.violater$.pipe(
      filter((violater: Citizen) => violater !== null),
      switchMap((violater: Citizen) =>
        this.http.post<FineRecord[]>(`${this.apiUrl}/officer/violator/`, { nic_number: violater.NIC.id_number })
      )
    ).subscribe({
      next: ((response: FineRecord[]) => {
        this.violaterFineRecordsSubject.next(response);
      }),
      error: ((error: HttpErrorResponse) => {
        // handle error
      })
    });
  }
}
