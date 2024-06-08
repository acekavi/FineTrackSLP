import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilityService } from './utility.service';

export const checkAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const utilityService = inject(UtilityService);
  const router = inject(Router);

  const token = utilityService.getAuthorizationToken();
  if (token) {
    const decodedToken = utilityService.decodeToken(token);
    if (decodedToken.exp! * 1000 > Date.now()) {
      return true;
    }
    // Token is expired, delete token and redirect to login
    utilityService.deleteAuthorizationToken();
    return router.createUrlTree(['/login']);
  } else {
    // No token, redirect to login
    return router.createUrlTree(['/login']);
  }
};

export const checkOfficerAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const utilityService = inject(UtilityService);
  const router = inject(Router);

  const token = utilityService.getAuthorizationToken();
  if (token) {
    const decodedToken = utilityService.decodeToken(token);
    if (decodedToken.exp! * 1000 > Date.now() && decodedToken.role === 'officer') {
      return true;
    } else {
      utilityService.deleteAuthorizationToken();
      return router.createUrlTree(['/login']);
    }
  } else {
    return router.createUrlTree(['/login']);
  }
}

export const checkCitizenAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const utilityService = inject(UtilityService);
  const router = inject(Router);

  const token = utilityService.getAuthorizationToken();
  if (token) {
    const decodedToken = utilityService.decodeToken(token);
    if (decodedToken.exp! * 1000 > Date.now() && decodedToken.role === 'citizen') {
      return true;
    } else {
      utilityService.deleteAuthorizationToken();
      return router.createUrlTree(['/login']);
    }
  } else {
    return router.createUrlTree(['/login']);
  }
}

export const checkStationAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const utilityService = inject(UtilityService);
  const router = inject(Router);

  const token = utilityService.getAuthorizationToken();
  if (token) {
    const decodedToken = utilityService.decodeToken(token);
    console.log(decodedToken);
    if (decodedToken.exp! * 1000 > Date.now() && decodedToken.role === 'station') {
      return true;
    } else {
      utilityService.deleteAuthorizationToken();
      return router.createUrlTree(['/login']);
    }
  } else {
    return router.createUrlTree(['/login']);
  }
}

export const checkUnauth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const utilityService = inject(UtilityService);
  const router = inject(Router);

  const token = utilityService.getAuthorizationToken();
  if (!token) {
    return true;
  }
  else {
    const decodedToken = utilityService.decodeToken(token);
    if (decodedToken.exp! * 1000 < Date.now()) {
      utilityService.deleteAuthorizationToken();
      return true;
    }
    if (decodedToken.role === 'citizen') {
      return router.createUrlTree(['/citizen']);
    } else if (decodedToken.role === 'officer') {
      return router.createUrlTree(['/officer']);
    }
    else if (decodedToken.role === 'station') {
      return router.createUrlTree(['/station']);
    }
    else {
      utilityService.deleteAuthorizationToken();
      return router.createUrlTree(['/login']);
    }
  }
};
