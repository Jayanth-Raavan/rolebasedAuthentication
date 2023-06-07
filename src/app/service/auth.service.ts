import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {
  }

  apiUrl = 'http://localhost:3000/';
  ProceedLogin(credentials: any) {
    return this.http.post(this.apiUrl + 'login', credentials , {observe : 'body'});
  }

  IsLoggedIn() {
    return localStorage.getItem('token') != null || 'undefined';
  }

  GetToken() {
    return localStorage.getItem('token') || '';
  }
  GetRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  HaveAccess() {
    var loginToken = localStorage.getItem('token') || '';
    var _extractedToken = loginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);
    console.log(_finalData);
    if (_finalData.username == 'adminUser') {
      return true;
    } else {
      alert("You don't have permission ");
      return false;
    }
  }

  LogOut() {
    alert('your session got expired!');
    localStorage.clear();
    this.route.navigate(['login']);
  }

  //refresh token
  GenerateRefreshToken() {
    let input = {
      token: this.GetToken(),
      refreshToken: this.GetRefreshToken(),
    };
    return this.http.post(this.apiUrl + 'refreshToken', input);
  }

  SaveToken(tokendata: any) {
    localStorage.setItem('token', tokendata.token);
    localStorage.setItem('refreshToken', tokendata.refreshToken);
  }

  //Role based
  tokenResp: any;
  GetRoleByToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenResp = JSON.parse(atob(_token));
    return this.tokenResp.username;
  }


  //menu list updation
  private _updateMenu = new Subject<void>();

  get updateMenu(){
    return this._updateMenu;
  }
}
