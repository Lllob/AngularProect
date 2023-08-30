import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ResponsInterseptorService implements HttpInterceptor{

  constructor(public toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return next.handle(req).pipe(tap((success) => {
      if(success instanceof HttpResponse){
        // if(success.url.endsWith('login') || success.url.endsWith('register') || success.url.endsWith('create') || success.url.endsWith('delete')){
          this.toastr.success('Success', 'Success');
         console.log('success', success);
        //  }
       } 
    }), catchError ((err) => {
      console.log('from interceptor', err);
        this.toastr.error(err.error.message, 'Error');
        alert(err.error.message)
       throw new Error (err.error.message);
    }))
  }
}
