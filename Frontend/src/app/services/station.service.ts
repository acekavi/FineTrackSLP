import { Injectable } from '@angular/core';
import { environment } from '../enviorenment/dev.enviorenment';
import { Station } from 'src/global-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = environment.apiUrl;
  private stationUserSubject: BehaviorSubject<Station | null>;
  public stationUser: Observable<Station | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.stationUserSubject = new BehaviorSubject<Station | null>(null);
    this.stationUser = this.stationUserSubject.asObservable();
  }

  public setUserDetails(station: Station): void {
    this.stationUserSubject.next(station);
  }
}
