import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
import { ViolaterDetails, LicenceResponse, NIC, NICResponse, Officer } from 'src/global-types';
import { environment } from '../enviorenment/dev.enviorenment';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = environment.apiUrl;
  private officerUserSubject: BehaviorSubject<Officer | null>;
  public officerUser$: Observable<Officer | null>;

  private violaterSubject: BehaviorSubject<NIC | null>;
  public violater$: Observable<NIC | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.officerUserSubject = new BehaviorSubject<Officer | null>(null);
    this.officerUser$ = this.officerUserSubject.asObservable();

    this.violaterSubject = new BehaviorSubject<NIC | null>(null);
    this.violater$ = this.violaterSubject.asObservable();
  }

  public setUserDetails(officer: Officer): void {
    this.officerUserSubject.next(officer);
  }

  private getUser(): Observable<Officer> {
    const getUserUrl = `${this.apiUrl}/officer/details`;
    return this.http.get<Officer>(getUserUrl);
  }

  public loadUserFromServer(): void {
    if (!this.utilityService.getAuthorizationToken) {
      return;
    }

    this.getUser().subscribe({
      next: (user: Officer) => {
        this.officerUserSubject.next(user);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        this.logoutUser();
      }
    });
  }

  public logoutUser(): void {
    this.utilityService.deleteAuthorizationToken();
    this.router.navigate(['']);
  }

  public checkDriverLicence(licence_number: string): Observable<LicenceResponse> {
    const checkDriverInfoUrl = `${this.apiUrl}/officer/check-driver`;
    return this.http.post<LicenceResponse>(checkDriverInfoUrl, { licence_number }).pipe(
      tap((response: LicenceResponse) => {
        this.violaterSubject.next(response.NIC);
      })
    );
  }

  public checkNicorPassport(body: { nic_number: string, passport_number: string }): Observable<NICResponse> {
    const checkNicorPassportUrl = `${this.apiUrl}/officer/check-nic-passort`;
    return this.http.post<NICResponse>(checkNicorPassportUrl, body);
  }

  getViolatorDetails(nic: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/officer/violator/${nic}`);
  }
}
