import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { UtilityService } from './utility.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';
import { Citizen } from 'src/global-types';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private apiUrl = environment.apiUrl;
  private citizenUserSubject: BehaviorSubject<Citizen | null>;
  public citizenUser: Observable<Citizen | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.citizenUserSubject = new BehaviorSubject<Citizen | null>(null);
    this.citizenUser = this.citizenUserSubject.asObservable();
  }

  public setUserDetails(citizen: Citizen): void {
    console.log(citizen);
    this.citizenUserSubject.next(citizen);
  }

}
