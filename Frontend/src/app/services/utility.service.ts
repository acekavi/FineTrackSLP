import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomJWTpayload } from 'src/global-types';
import { jwtDecode } from 'jwt-decode';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
  ) { }

  public setAuthorizationToken(token: string): void {
    const decodedToken = this.decodeToken(token);
    const expiresAt = new Date(decodedToken.exp! * 1000);

    this.cookieService.set('userToken', token, expiresAt, '/', '', true, 'Strict');
  }

  public decodeToken(token: string): CustomJWTpayload {
    const decodedToken = jwtDecode<CustomJWTpayload>(token);
    return decodedToken;
  }

  public getAuthorizationToken(): string {
    return this.cookieService.get('userToken');
  }

  public deleteAuthorizationToken(): void {
    this.cookieService.delete('userToken', '/', '');
  }

  public handleHttpError(error: HttpErrorResponse): void {
    let message = error.error;
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else if (error.status === 401) {
      message = "Unauthorized access";
    } else if (error.status === 404) {
      message = "Resource not found";
    }
    this.displaySnackbar(message, 'error-snack');
  }

  public displaySnackbar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: message, panelClass: panelClass },
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
