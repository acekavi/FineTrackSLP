import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { LoginResponse } from 'src/global-types';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService,
    private cookieService: CookieService
  ) { }

  // Public methods
  public loginUser(credentials: { username: string; password: string }): Observable<LoginResponse> {
    const loginUrl = `${this.apiUrl}/citizen/login`;
    return this.http.post<LoginResponse>(loginUrl, credentials).pipe(
      tap((response: LoginResponse) => {
        this.utilityService.displaySnackbar('Login successful', 'success-snack');
        this.utilityService.setAuthorizationToken(response.token);
      }),
      catchError((error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }

  public getUserDetails(): Observable<any> {
    const userUrl = `${this.apiUrl}/citizen/user`;
    return this.http.get(userUrl).pipe(
      tap((response: any) => {
        this.utilityService.displaySnackbar('User details fetched', 'success-snack');
      }),
      catchError((error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }

  public logoutUser(): void {
    this.cookieService.delete('userToken', '/', '');
    this.router.navigate(['/login']);
    this.utilityService.displaySnackbar('Logout successful', 'success-snack');
  }
}
