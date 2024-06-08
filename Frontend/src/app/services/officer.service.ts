import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
import { Citizen, NIC, Officer } from 'src/global-types';
import { environment } from '../enviorenment/dev.enviorenment';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = environment.apiUrl;
  private officerUserSubject: BehaviorSubject<Officer | null>;
  public officerUser$: Observable<Officer | null>;

  private violaterSubject: BehaviorSubject<Citizen | null>;
  public violater$: Observable<Citizen | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.officerUserSubject = new BehaviorSubject<Officer | null>(null);
    this.officerUser$ = this.officerUserSubject.asObservable();

    this.violaterSubject = new BehaviorSubject<Citizen | null>(null);
    this.violater$ = this.violaterSubject.asObservable();
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

  getViolatorDetails(nic: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/officer/violator/${nic}`);
  }
}
