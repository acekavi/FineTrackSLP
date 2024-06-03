import { HttpInterceptorFn } from '@angular/common/http';
import { UtilityService } from '../services/utility.service';
import { inject } from '@angular/core';

export const requestHeadersInterceptor: HttpInterceptorFn = (req, next
) => {
  // Get the auth token from the service.
  const authToken = inject(UtilityService).getAuthorizationToken();

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};