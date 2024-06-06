import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Officer } from 'src/global-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {
  private apiUrl = environment.apiUrl;
  private officerUserSubject: BehaviorSubject<Officer | null>;
  public officerUser$: Observable<Officer | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.officerUserSubject = new BehaviorSubject<Officer | null>(null);
    this.officerUser$ = this.officerUserSubject.asObservable();
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
}
