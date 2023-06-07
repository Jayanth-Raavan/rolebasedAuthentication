import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private inject : Injector){}
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //==================================================================//
    
    //using static token ............/

    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluVXNlciIsImlhdCI6MTY4MzgyOTI5NCwiZXhwIjoxNjgzODMyODk0fQ.jQLJy_sDm2CC2iLJ8Sb_7R0DibSznwNNxbLzCxncFic';
    // let jwtToken = req.clone({
    //   setHeaders:{
    //     Authorization : 'bearer ' + token
    //   }
    // })
    // return next.handle(jwtToken);
//======================================================================================//
    // using dynamic token......../

    // let authservice = this.inject.get(AuthService);
    
  /*  let jwtToken = req.clone({
      setHeaders:{
        Authorization : 'bearer ' + authservice.GetToken()
      }
    })   -----------------------*/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(AuthService);
    let authReq = req;
    authReq = this.AddTokenheader(req, authservice.GetToken());
    return next.handle(authReq).pipe(
      catchError(errordata => {
        if (errordata.status === 401 || errordata.status === 403) {
          // need to implement logout
          // authservice.LogOut();
          // refresh token logic
         return this.handleRefreshToken(req, next);
        }
        return throwError(errordata);
      })
    );

  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthService);
    // let refreshToken = authservice.GetRefreshToken();
    return authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        authservice.SaveToken(data);
        console.log(" access token" + data.accessToken )
        localStorage.setItem('accessToken', data.accessToken);
        return next.handle(this.AddTokenheader(request, data.accessToken));
      }),
      catchError(error => {
        authservice.LogOut();
        return throwError(error);
      })
    );
  }
  

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }


}
