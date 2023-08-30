
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService  implements HttpInterceptor {
  //otorizaciqta na usera

  constructor(private authService: AuthService) { //importvame AuthService
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    let accessToken = this.authService.getToken(); 
       //console.log('interseptor token ' + accessToken)
    let jsonReq = req.clone({ 
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
    return next.handle(jsonReq) 
  }
}
