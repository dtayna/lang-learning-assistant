import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

    const apiReq = req.clone({
      setHeaders: {
        apikey: environment.bearerToken,
        Authorization: `Bearer ${environment.bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
  
    return next(apiReq);
  };