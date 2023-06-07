import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private service : AuthService, private route : Router){}
  canActivate() {
    if(this.service.IsLoggedIn()){
      console.log(this.service.IsLoggedIn())
      return true;
    }
    else
      this.route.navigate(['login'])
      return false;
  }
}