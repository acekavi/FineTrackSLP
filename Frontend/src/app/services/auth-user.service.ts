import { Injectable } from "@angular/core";
import { environment } from "../enviorenment/dev.enviorenment";
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from "rxjs";
import { Citizen, LoginResponse, Officer, Station } from "src/global-types";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UtilityService } from "./utility.service";

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router,
        private utilityService: UtilityService
    ) {
    }

    public login(userType: 'Citizen' | 'Officer' | 'Station', credentials: { username: string; password: string }): Observable<LoginResponse> {
        const loginUrl = `${this.apiUrl}/${userType.toLowerCase()}/login`;
        credentials.username = credentials.username.toLowerCase();
        return this.http.post<LoginResponse>(loginUrl, credentials).pipe(
            tap(response => {
                this.utilityService.setAuthorizationToken(response.token);
                const decodedToken = this.utilityService.decodeToken(response.token)
                if (decodedToken.role.toLowerCase() === 'citizen') {
                    this.router.navigate(['/citizen']);
                } else if (decodedToken.role.toLowerCase() === 'officer') {
                    this.router.navigate(['/officer']);
                } else if (decodedToken.role.toLowerCase() === 'station') {
                    this.router.navigate(['/station']);
                } else {
                    this.utilityService.displaySnackbar('Invalid role', 'error-snack');
                    return;
                }

                this.router.navigate([`/${decodedToken.role.toLowerCase()}`]);
                this.utilityService.displaySnackbar('Login successful', 'success-snack');
            })
        );
    }

    public logout() {
        this.utilityService.deleteAuthorizationToken();
        this.router.navigate(['/login']);
        this.utilityService.displaySnackbar('Logout successful', 'success-snack');
    }

    public register(credentials: {
        nicNumber: string;
        username: string;
        password: string;
        mobile: string;
    }): Observable<Citizen> {
        return this.http.post<Citizen>(`${this.apiUrl}/citizen/register`, credentials).pipe(
            tap(() => {
                this.utilityService.displaySnackbar('Registration successful', 'success-snack');
            }),
            catchError((error: HttpErrorResponse) => {
                this.utilityService.displaySnackbar(error.error.message, 'error-snack');
                return throwError(() => error);
            })
        );
    }
}