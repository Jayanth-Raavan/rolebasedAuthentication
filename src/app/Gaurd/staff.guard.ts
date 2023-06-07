import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router){}
  currentUser : any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.IsLoggedIn()){
        this.currentUser = this.service.GetRoleByToken(this.service.GetToken());
        if(this.currentUser == 'adminUser' || this.currentUser == 'staffUser'){
          return true;
        }
        else{
          alert("You are not authorized to access this menu");
          this.route.navigate(['']);
          return false;
        }
      }
      else{
        alert("You are not authorized to access this menu")
        this.route.navigate(['login'])
        return false;
      }
    }
  
}
