import { Injectable } from "@angular/core";
import { environment } from "../enviorenment/dev.enviorenment";
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from "rxjs";
import { Citizen, LoginResponse, Officer, Station, User } from "src/global-types";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UtilityService } from "./utility.service";
import { CitizenService } from "./citizen.service";
import { OfficerService } from "./officer.service";
import { StationService } from "./station.service";

interface CitizenloginResponse extends LoginResponse {
    user: Citizen;
}

interface OfficerloginResponse extends LoginResponse {
    user: Officer;
}

interface StationloginResponse extends LoginResponse {
    user: Station;
}

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router,
        private utilityService: UtilityService,
        private citizenService: CitizenService,
        private officerService: OfficerService,
        private stationService: StationService
    ) {
    }

    public login(userType: 'Citizen' | 'Officer' | 'Station', credentials: { username: string; password: string }): Observable<User> {
        const loginUrl = `${this.apiUrl}/${userType.toLowerCase()}/login`;
        credentials.username = credentials.username.toLowerCase();
        return this.http.post<CitizenloginResponse | OfficerloginResponse | StationloginResponse>(loginUrl, credentials).pipe(
            tap(response => {
                this.utilityService.setAuthorizationToken(response.token);
                if (response.user.role.toLowerCase() === 'citizen') {
                    this.citizenService.setUserDetails(response.user as Citizen);
                } else if (response.user.role.toLowerCase() === 'officer') {
                    this.officerService.setUserDetails(response.user as Officer);
                } else if (response.user.role.toLowerCase() === 'station') {
                    this.stationService.setUserDetails(response.user as Station);
                } else {
                    this.utilityService.displaySnackbar('Invalid role', 'error-snack');
                    return;
                }

                this.router.navigate([`/${response.user.role.toLowerCase()}`]);
                this.utilityService.displaySnackbar('Login successful', 'success-snack');
            }),
            map(response => response.user)
        );
    }

    public logout() {
        this.utilityService.deleteAuthorizationToken();
        this.router.navigate(['/login']);
        this.utilityService.displaySnackbar('Logout successful', 'success-snack');
    }

    public register(credentials: {
        NIC: string;
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