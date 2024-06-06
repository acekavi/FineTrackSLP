import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Officer } from 'src/global-types';
import { HttpClient } from '@angular/common/http';
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
}
