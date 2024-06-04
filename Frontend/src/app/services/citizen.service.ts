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

}
