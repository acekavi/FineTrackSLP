import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import { Citizen, NIC } from 'src/global-types';

interface CitizenwithNIC extends Citizen {
  NIC?: NIC;
}


@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = environment.apiUrl;
  private citizenUserSubject: BehaviorSubject<CitizenwithNIC>;
  public citizenUser$: Observable<CitizenwithNIC>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.citizenUserSubject = new BehaviorSubject<CitizenwithNIC>({} as CitizenwithNIC);
    this.citizenUser$ = this.citizenUserSubject.asObservable();
  }

  private fetchCitizenUser(): Observable<CitizenwithNIC> {
    const getUserUrl = `${this.apiUrl}/citizen/details`;
    return this.http.get<CitizenwithNIC>(getUserUrl);
  }

  public loadCitizenFromServer(): void {
    if (!this.utilityService.getAuthorizationToken) {
      return;
    }

    this.fetchCitizenUser().subscribe({
      next: (user: CitizenwithNIC) => {
        this.citizenUserSubject.next(user);
      },
      error: (error: HttpErrorResponse) => {
        this.utilityService.handleHttpError(error);
        this.utilityService.logoutUser();
      }
    });
  }

}
