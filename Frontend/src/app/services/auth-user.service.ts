import { Injectable } from "@angular/core";
import { environment } from "../enviorenment/dev.enviorenment";
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from "rxjs";
import { Citizen, LoginResponse, Officer, Station, User } from "src/global-types";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UtilityService } from "./utility.service";

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

    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient, private router: Router, private utilityService: UtilityService) {
        const user = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(userType: 'Citizen' | 'Officer' | 'Station', credentials: { username: string; password: string }): Observable<User> {
        const loginUrl = `${this.apiUrl}/${userType.toLowerCase()}/login`;
        return this.http.post<CitizenloginResponse | OfficerloginResponse | StationloginResponse>(loginUrl, credentials).pipe(
            tap(response => {
                this.utilityService.setAuthorizationToken(response.token);
                this.currentUserSubject.next(response.user);
                this.utilityService.displaySnackbar('Login successful', 'success-snack');
            }),
            map(response => response.user)
        );
    }

    logout() {
        this.utilityService.deleteAuthorizationToken();
        this.router.navigate(['/login']);
        this.utilityService.displaySnackbar('Logout successful', 'success-snack');
    }
}